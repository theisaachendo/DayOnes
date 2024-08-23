import AWS from 'aws-sdk';
import { DynamoDBClient, QueryCommand, PutItemCommand, ScanCommand, GetCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import haversine from 'haversine';

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const client = new DynamoDBClient({ region: "us-east-1" });

const usersTable = 'UserTable';
const postsTable = 'Posts';
const chatSessionsTable = 'ChatSessions';
export const fetchPostsFromDynamoDB = async () => {
    const params = {
        TableName: postsTable,
    };

    try {
        const command = new ScanCommand(params); // Using ScanCommand to retrieve all posts
        const response = await client.send(command);
        return response.Items.map(item => unmarshall(item)); // Convert DynamoDB items to JSON
    } catch (error) {
        console.error('Error fetching posts from DynamoDB:', error);
        throw error;
    }
};

// Fetch chat sessions from DynamoDB
export const fetchChatSessionsFromDynamoDB = async () => {
    const params = {
        TableName: chatSessionsTable,
    };

    try {
        const command = new ScanCommand(params); // Using ScanCommand to retrieve all chat sessions
        const response = await client.send(command);
        return response.Items.map(item => unmarshall(item)); // Convert DynamoDB items to JSON
    } catch (error) {
        console.error('Error fetching chat sessions from DynamoDB:', error);
        throw error;
    }
};



// Fetch user data by username
export const fetchUserByUsername = async (username) => {
    const params = {
        TableName: usersTable,
        KeyConditionExpression: "UserName = :username",
        ExpressionAttributeValues: {
            ":username": { S: username }
        }
    };

    try {
        const queryCommand = new QueryCommand(params);
        const response = await client.send(queryCommand);
        if (response.Count > 0) {
            return unmarshall(response.Items[0]);
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw error;
    }
};

// Check if user exists
export const checkUserExists = async (username) => {
    const user = await fetchUserByUsername(username);
    return user !== null;
};

// Fetch posts by geohash
export const fetchPostsByGeohash = async (geohash, latitude, longitude) => {
    const params = {
        TableName: postsTable,
        IndexName: 'Geohash-index',
        KeyConditionExpression: '#geohash = :geohash',
        ExpressionAttributeNames: {
            '#geohash': 'Geohash',
        },
        ExpressionAttributeValues: {
            ':geohash': geohash,
        },
    };

    try {
        const data = await dynamoDb.query(params).promise();
        const posts = data.Items;

        // Filter by distance
        return posts.filter(post => {
            const postLocation = {
                latitude: post.Lat,
                longitude: post.Lon,
            };
            const fanLocation = { latitude, longitude };

            const distanceInMeters = haversine(fanLocation, postLocation, { unit: 'meter' });
            const postMaxDistanceInMeters = post.Distance * 0.3048;

            return distanceInMeters <= postMaxDistanceInMeters;
        });
    } catch (error) {
        console.error('Error querying posts by geohash:', error);
        throw error;
    }
};

// List chat sessions for a user
export const listChatSessionsForUser = async (username) => {
    const params = {
        TableName: chatSessionsTable,
        FilterExpression: 'contains(Members, :username)',
        ExpressionAttributeValues: { ':username': username }
    };

    try {
        const results = [];
        let items;
        do {
            items = await dynamoDb.scan(params).promise();
            results.push(...items.Items.map(item => unmarshall(item)));
            params.ExclusiveStartKey = items.LastEvaluatedKey;
        } while (typeof items.LastEvaluatedKey !== "undefined");

        return results;
    } catch (error) {
        console.error('Error listing chat sessions for user:', error);
        throw error;
    }
};

// Find private session between two users
export const findPrivateSession = async (username1, username2) => {
    const params = {
        TableName: chatSessionsTable,
        FilterExpression: 'contains(Members, :username1) AND contains(Members, :username2) AND SessionType = :sessionType',
        ExpressionAttributeValues: {
            ':username1': username1,
            ':username2': username2,
            ':sessionType': 'private'
        }
    };

    try {
        const result = await dynamoDb.scan(params).promise();
        if (result.Items.length > 0) {
            return unmarshall(result.Items[0]);
        }
        return null;
    } catch (error) {
        console.error(`Error finding private session between ${username1} and ${username2}:`, error);
        throw error;
    }
};

// Fetch session by ID
export const fetchChatSessionById = async (username, sessionId) => {
    const params = {
        TableName: chatSessionsTable,
        Key: { UserName: username, SessionId: sessionId }
    };

    try {
        const data = await dynamoDb.get(params).promise();
        return data.Item ? unmarshall(data.Item) : null;
    } catch (error) {
        console.error('Error fetching chat session by ID:', error);
        throw error;
    }
};

// Create or update a chat session
export const createOrUpdateSession = async (sessionData) => {
    const params = {
        TableName: chatSessionsTable,
        Item: marshall(sessionData)
    };

    try {
        const putCommand = new PutItemCommand(params);
        await client.send(putCommand);
        console.log('Chat session created or updated successfully.');
    } catch (error) {
        console.error('Error creating or updating chat session:', error);
        throw error;
    }
};

// Other necessary functions like broadcasting, sending messages, etc.
export const sendData = async (username, data, apiGEndpoint) => {
    const connectionId = await getConnectionIdByUsername(username);
    if (!connectionId) {
        console.error(`No valid connectionId found for username: ${username}`);
        return;
    }

    const apiGateway = new AWS.ApiGatewayManagementApi({ endpoint: apiGEndpoint });
    try {
        await apiGateway.postToConnection({
            ConnectionId: connectionId,
            Data: JSON.stringify(data),
        }).promise();
    } catch (e) {
        console.error(`Sending data failed: ${e.message}`);
        if (e.statusCode === 410) {
            console.error(`Stale connectionId found, removing connectionId for ${username}`);
            await removeConnectionIdForUser(username);
        }
    }
};

export const getConnectionIdByUsername = async (username) => {
    const user = await fetchUserByUsername(username);
    return user ? user.ConnectionID : null;
};

export const removeConnectionIdForUser = async (username) => {
    try {
        const roleValue = await getIdForUsername(username);
        await dynamoDb.update({
            TableName: usersTable,
            Key: { UserName: username, Role: roleValue },
            UpdateExpression: "REMOVE ConnectionID"
        }).promise();
    } catch (error) {
        console.error(`Error removing connection ID for user: ${error.message}`);
    }
};

export const getIdForUsername = async (username) => {
    const params = {
        TableName: usersTable,
        KeyConditionExpression: 'UserName = :username',
        ExpressionAttributeValues: { ':username': username }
    };
    try {
        const result = await dynamoDb.query(params).promise();
        return result.Items.length > 0 ? result.Items[0].Role : null;
    } catch (error) {
        console.error(`Error getting ID for username: ${error.message}`);
        throw error;
    }
};
