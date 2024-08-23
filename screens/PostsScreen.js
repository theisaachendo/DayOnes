import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

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
      {/* Page Title */}
      <Text style={styles.pageTitle}>Posts</Text>

      {/* ScrollView to Display Posts */}
      <ScrollView style={styles.scrollView}>
        {posts.map((post, index) => {
          const date = new Date(post.CreatedAt).toLocaleString();
          return (
            <View key={index} style={styles.postCard}>
              <Text style={styles.postUser}>User: {post.UserName}</Text>
              <Text style={styles.postContent}>Content: {post.Content}</Text>
              <Text style={styles.postDistance}>Max Distance: {post.Distance} feet</Text>
              <Text style={styles.postLocation}>Lat: {post.Lat}, Lon: {post.Lon}</Text>
              <Text style={styles.postDate}>Date: {date}</Text>
            </View>
          );
        })}
      </ScrollView>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={sendLocationData} style={styles.button}>
          <Text style={styles.buttonText}>Get Posts Near You</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert("My Posts", "This feature is under construction!")} style={styles.button}>
          <Text style={styles.buttonText}>View My Posts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  postCard: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  postUser: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  postContent: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  postDistance: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  postLocation: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  postDate: {
    fontSize: 14,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default PostsScreen;
