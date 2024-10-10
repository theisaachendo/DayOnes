import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput, Modal, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { BASEURL } from '../../assets/constants';
import ProfilePictureButton from '../../assets/components/ProfilePictureButton';

const ArtistPostsPage = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const profile = useSelector(state => state.userProfile) || { username: 'unknown' };
  const accessToken = useSelector(state => state.accessToken);

  const fetchArtistPosts = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/v1/post/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setPosts(response.data?.data?.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      Alert.alert('Error', 'An error occurred while fetching posts.');
    }
  };

  const toggleLike = async (postId) => {
    console.log("Attempting to toggle like for post:", postId); // Log the post ID

    try {
      const url = `${BASEURL}/api/v1/post/${postId}/likes`;
      console.log("Request URL:", url); // Log the request URL

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      console.log("Response:", result); // Log the entire response

      if (response.ok) {
        console.log("Post liked successfully!");
        Alert.alert("Success", "Post liked!");
      } else {
        console.error("Error liking post:", result);
        Alert.alert("Error", result.message || "Unable to like the post");
      }
    } catch (error) {
      console.error("Network error:", error);
      Alert.alert("Error", "Unable to like the post due to a network issue.");
    }
  };



  const addComment = async () => {
    if (!commentText) {
      Alert.alert("Error", "Comment cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(
        `${BASEURL}/api/v1/post/${selectedPostId}/comment`,
        { message: commentText },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (response.status === 201) {
        Alert.alert("Comment added", commentText);
        setCommentText("");
        setIsModalVisible(false);
      } else {
        Alert.alert("Error", "Unexpected response from the server.");
      }
    } catch (error) {
      let errorMessage = "Unable to add comment.";
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 401) {
          errorMessage = "Unauthorized. Please check your credentials.";
        } else if (error.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (error.request) {
        errorMessage = "No response from the server. Check your internet connection.";
      }
      console.error("Error adding comment:", errorMessage);
      Alert.alert("Error", errorMessage);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`${BASEURL}/api/v1/post/${postId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setPosts(posts.filter(post => post.id !== postId));
      Alert.alert('Post deleted successfully');
    } catch (error) {
      Alert.alert('Error', 'An error occurred while deleting the post.');
    }
  };

  return (
    <View style={styles.container}>
      <ProfilePictureButton navigation={navigation} />
      <Text style={styles.pageTitle}>Posts</Text>
      <ScrollView style={styles.scrollView}>
        {posts.map((post, index) => (
          <View key={index} style={styles.postContainer}>
            <Text style={styles.postUser}>{post.locale || 'Unknown Location'}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => Alert.alert(
                'Confirm Delete',
                'Are you sure you want to delete this post?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Delete', onPress: () => handleDeletePost(post.id) }
                ]
              )}
            >
              <Icon name="times" size={20} color="#FF0000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Post Data', JSON.stringify(post))}>
              {post.image_url && (
                <Image source={{ uri: post.image_url }} style={styles.postImage} />
              )}
            </TouchableOpacity>
            <Text style={styles.postText}>{post.message}</Text>
            <View style={styles.interactionContainer}>
              <TouchableOpacity onPress={() => toggleLike(post.id, post.liked)}>
                <Icon name="heart" size={20} color={post.liked ? "#FF0000" : "#FFFFFF"} />
                <Text style={styles.interactionText}> Like</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setSelectedPostId(post.id);
                setIsModalVisible(true);
              }}>
                <Icon name="comment" size={20} color="#FFFFFF" style={styles.commentIcon} />
                <Text style={styles.interactionText}> Comment</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      {posts.length === 0 && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={fetchArtistPosts} style={styles.button}>
            <Text style={styles.buttonText}>Fetch Posts</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Comment Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide">
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Add a Comment</Text>
      <TextInput
        style={styles.modalInput}
        placeholder="Write your comment..."
        value={commentText}
        onChangeText={setCommentText}
        placeholderTextColor="#aaa"
      />
      <View style={styles.modalButtonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={addComment}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0c002b', padding: 16 },
  pageTitle: { fontSize: 28, fontWeight: 'bold', color: '#ffffff', textAlign: 'center', marginBottom: 20 },
  scrollView: { flex: 1, marginBottom: 20 },
  postContainer: { marginBottom: 20 },
  postUser: { fontSize: 16, color: '#ffffff', marginBottom: 5, fontWeight: 'bold', paddingLeft: 5 },
  postImage: { width: '100%', height: 400 },
  interactionContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10, paddingLeft: 5 },
  interactionText: { fontSize: 16, color: '#FF0080', marginLeft: 5 },
  commentIcon: { marginLeft: 20 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  button: { backgroundColor: '#FF0080', padding: 15, borderRadius: 25, alignItems: 'center', shadowColor: '#FF0080', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.8, shadowRadius: 8, elevation: 5 },
  buttonText: { fontSize: 18, color: '#ffffff', fontWeight: 'bold' },
  deleteButton: { position: 'absolute', top: 10, right: 10 },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '80%', backgroundColor: '#fff', borderRadius: 10, padding: 20, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  modalInput: { width: '100%', height: 40, borderColor: '#ddd', borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 20 },
  modalButtonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  submitButton: { flex: 1, backgroundColor: '#FF0080', paddingVertical: 10, borderRadius: 5, alignItems: 'center', marginRight: 5 },
  cancelButton: { flex: 1, backgroundColor: '#888', paddingVertical: 10, borderRadius: 5, alignItems: 'center', marginLeft: 5 },
});


export default ArtistPostsPage;
