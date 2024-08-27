import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

const PostsScreen = ({ navigation }) => {
  const locationData = useSelector(state => state.geolocationData);
  const [posts, setPosts] = useState([]);

  const sendLocationData = async () => {
    const data = {
      geohash: locationData.geohash,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    };

    try {
      const response = await fetch('https://a55yh6pw6pks3fc7vtlfs65tli0ujdlf.lambda-url.us-east-1.on.aws/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.length > 0) {
          setPosts(result); // Save posts to state
        } else {
          setPosts([]); // Clear posts if none are found
          Alert.alert("Sorry", "No nearby posts found.");
        }
      } else {
        Alert.alert("Error", "Failed to invoke Lambda function");
      }
    } catch (error) {
      console.error("Error invoking Lambda function", error);
      Alert.alert("Error", "An unexpected error occurred");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Posts</Text>

      <ScrollView style={styles.scrollView}>
        {posts.map((post, index) => {
          const date = new Date(post.CreatedAt).toLocaleString();
          return (
            <View key={index} style={styles.postContainer}>
              <Text style={styles.postUser}>{post.UserName}</Text>
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={sendLocationData} style={styles.button}>
          <Text style={styles.buttonText}>Get Posts Near You</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert("My Posts", "This feature is under construction!")} style={styles.buttonSecondary}>
          <Text style={styles.buttonText}>View My Posts</Text>
        </TouchableOpacity>
      </View>
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
  buttonSecondary: {
    flex: 1,
    backgroundColor: '#282828',
    padding: 15,
    borderRadius: 25,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF0080',
    shadowColor: '#000',
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

export default PostsScreen;
