import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

const ArtistPostsPage = () => {
  const [posts, setPosts] = useState([]);

  // Retrieve the username and geolocation data from the user's profile in the Redux store
  const profile = useSelector(state => state.userProfile) || { username: 'unknown' };
  const geolocationData = useSelector(state => state.geolocationData) || { locale: 'Location Unknown' };
  const artistUsername = profile.username;

  // Log the username to the console for troubleshooting
  console.log(`Fetching posts for username: ${artistUsername}`);

  const fetchArtistPosts = async () => {
    try {
      console.log(`Sending request to Lambda with username: ${artistUsername}`);
      const response = await fetch(`https://q3bf3wdaqwd4aa5cahc2kffyke0dqiae.lambda-url.us-east-1.on.aws/?artistUsername=${artistUsername}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok) {
        if (result.data && result.data.length > 0) {
          setPosts(result.data); // Save posts to state
          console.log(`Posts fetched successfully: ${result.data.length} posts found.`);
        } else {
          setPosts([]); // Clear posts if none are found
          Alert.alert("Sorry", "No recent posts found.");
          console.log('No posts found for this username.');
        }
      } else {
        Alert.alert("Error", "Failed to invoke Lambda function");
        console.error('Failed to fetch posts: Non-OK response from Lambda.');
      }
    } catch (error) {
      console.error("Error invoking Lambda function:", error);
      Alert.alert("Error", "An unexpected error occurred");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Your Recent Posts</Text>

      <ScrollView style={styles.scrollView}>
        {posts.map((post, index) => {
          const date = new Date(post.CreatedAt).toLocaleString();
          return (
            <View key={index} style={styles.postContainer}>
              <Text style={styles.postUser}>{geolocationData.locale}</Text>
              <TouchableOpacity onPress={() => Alert.alert('Post Data', JSON.stringify(post))}>
                {post.ImageUrl && (
                  <Image
                    source={{ uri: post.ImageUrl }}
                    style={styles.postImage}
                  />
                )}
              </TouchableOpacity>
              <View style={styles.interactionContainer}>
                <Icon name="heart" size={20} color="#FF0080" />
                <Text style={styles.interactionText}> Like</Text>
                <Icon name="comment" size={20} color="#FF0080" style={styles.commentIcon} />
                <Text style={styles.interactionText}> Comment</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Conditionally render the button if no posts have been fetched */}
      {posts.length === 0 && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={fetchArtistPosts} style={styles.button}>
            <Text style={styles.buttonText}>Fetch Your Posts</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  postContainer: {
    marginBottom: 20, // Add space between posts
  },
  postUser: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 5,
    fontWeight: 'bold',
    paddingLeft: 5, // Adjust left padding to align with the post image
  },
  postImage: {
    width: '100%',
    height: 400, // Adjust height to match desired aspect ratio
  },
  interactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 5, // Adjust left padding to align with the post image
  },
  interactionText: {
    fontSize: 16,
    color: '#FF0080',
    marginLeft: 5,
  },
  commentIcon: {
    marginLeft: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#FF0080',
    padding: 15,
    borderRadius: 25,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#FF0080',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default ArtistPostsPage;
