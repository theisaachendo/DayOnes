using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Maui.Controls;
using Microsoft.Maui.Media;
using Microsoft.Maui.Storage;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Amazon.Runtime;

namespace DayOnes.UtilityClass
{
    public class D1Account
    {
        public string ID { get; set; }  // Partition key
        public string Username { get; set; }  // Sort key
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Instagram { get; set; }
        public DateTime CreatedAt { get; set; }
        public string ProfileImagePath { get; set; }  // Add ProfileImagePath property
    }

    public static class D1AccountMethods
    {
        private const string APP_TAG = "DayOnesApp";
        private static readonly string tableName = "D1UsersLookup.2"; // Update with your table name
        private static AmazonDynamoDBClient _dynamoDbClient;

        static D1AccountMethods()
        {
            var credentials = new BasicAWSCredentials("YOUR_ACCESS_KEY", "YOUR_SECRET_KEY");
            _dynamoDbClient = new AmazonDynamoDBClient(credentials, RegionEndpoint.USEast1);
        }

        // Method to authenticate a user
        public static async Task<D1Account> AuthenticateUserAsync(string username, string password)
        {
            try
            {
                var request = new QueryRequest
                {
                    TableName = tableName,
                    KeyConditionExpression = "Username = :username",
                    ExpressionAttributeValues = new Dictionary<string, AttributeValue>
                    {
                        { ":username", new AttributeValue { S = username } }
                    }
                };

                var response = await _dynamoDbClient.QueryAsync(request);

                if (response.Items.Count > 0)
                {
                    var item = response.Items[0];
                    var dbPassword = item["Password"].S;

                    if (dbPassword == password)
                    {
                        var account = new D1Account
                        {
                            ID = item["ID"].S,
                            Username = item["Username"].S,
                            Password = dbPassword,
                            FullName = item["FullName"].S,
                            Email = item["Email"].S,
                            Phone = item["Phone"].S,
                            Instagram = item["Instagram"].S,
                            CreatedAt = DateTime.Parse(item["CreatedAt"].S),
                            ProfileImagePath = item.ContainsKey("ProfileImagePath") ? item["ProfileImagePath"].S : null
                        };

                        Console.WriteLine($"{APP_TAG}: User authenticated successfully.");
                        return account;
                    }
                    else
                    {
                        Console.WriteLine($"{APP_TAG}: Invalid password.");
                        return null;
                    }
                }
                else
                {
                    Console.WriteLine($"{APP_TAG}: User not found.");
                    return null;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{APP_TAG}: Error authenticating user: {ex.Message}\nStack Trace: {ex.StackTrace}");
                return null;
            }
        }

        // Method to store user data in DynamoDB
        public static async Task StoreUserDataToDynamoDB(D1Account account)
        {
            if (account == null) return;

            try
            {
                var item = new Dictionary<string, AttributeValue>
                {
                    { "ID", new AttributeValue { S = account.ID } },
                    { "Username", new AttributeValue { S = account.Username } },
                    { "Password", new AttributeValue { S = account.Password } },
                    { "FullName", new AttributeValue { S = account.FullName } },
                    { "Email", new AttributeValue { S = account.Email } },
                    { "Phone", new AttributeValue { S = account.Phone } },
                    { "Instagram", new AttributeValue { S = account.Instagram } },
                    { "CreatedAt", new AttributeValue { S = account.CreatedAt.ToString("o") } },
                    { "ProfileImagePath", new AttributeValue { S = account.ProfileImagePath ?? string.Empty } }
                };

                var request = new PutItemRequest
                {
                    TableName = tableName,
                    Item = item
                };

                await _dynamoDbClient.PutItemAsync(request);
                Console.WriteLine($"{APP_TAG}: User data stored in DynamoDB.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{APP_TAG}: Error storing user data in DynamoDB: {ex.Message}\nStack Trace: {ex.StackTrace}");
            }
        }

        // Method to store user data locally
        public static async Task StoreUserDataLocally(D1Account account)
        {
            if (account == null) return;

            try
            {
                await Task.Run(() =>
                {
                    Preferences.Set("Username", account.Username);
                    Preferences.Set("FullName", account.FullName);
                    Preferences.Set("Email", account.Email);
                    Preferences.Set("Phone", account.Phone);
                    Preferences.Set("Instagram", account.Instagram);
                    Preferences.Set("CreatedAt", account.CreatedAt.ToString("o"));
                    Preferences.Set($"{account.Username}_ProfileImagePath", account.ProfileImagePath);
                });

                Console.WriteLine($"{APP_TAG}: User data stored locally.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{APP_TAG}: Error storing user data locally: {ex.Message}\nStack Trace: {ex.StackTrace}");
            }
        }

        // Method to retrieve local user data
        public static D1Account GetLocalUserData()
        {
            try
            {
                var username = Preferences.Get("Username", null);
                if (string.IsNullOrEmpty(username)) return null;

                return new D1Account
                {
                    Username = username,
                    FullName = Preferences.Get("FullName", null),
                    Email = Preferences.Get("Email", null),
                    Phone = Preferences.Get("Phone", null),
                    Instagram = Preferences.Get("Instagram", null),
                    CreatedAt = DateTime.Parse(Preferences.Get("CreatedAt", DateTime.Now.ToString("o"))),
                    ProfileImagePath = Preferences.Get($"{username}_ProfileImagePath", null)
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{APP_TAG}: Error retrieving local user data: {ex.Message}\nStack Trace: {ex.StackTrace}");
                return null;
            }
        }

        // Method to update profile
        public static void UpdateProfile(D1Account updatedProfile)
        {
            if (updatedProfile == null) return;

            try
            {
                Console.WriteLine($"{APP_TAG}: Updated profile for {updatedProfile.Username}");
                Preferences.Set("Username", updatedProfile.Username);
                Preferences.Set("Email", updatedProfile.Email);
                Preferences.Set("Phone", updatedProfile.Phone);
                Preferences.Set("Password", updatedProfile.Password);
                Preferences.Set($"{updatedProfile.Username}_ProfileImagePath", updatedProfile.ProfileImagePath);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{APP_TAG}: Error updating profile: {ex.Message}");
            }
        }

        // Method to update profile image path
        public static void UpdateProfileImagePath(string username, string path)
        {
            try
            {
                Console.WriteLine($"{APP_TAG}: Updated profile image path for {username} to {path}");
                Preferences.Set($"{username}_ProfileImagePath", path);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{APP_TAG}: Error updating profile image path: {ex.Message}");
            }
        }
    }
}