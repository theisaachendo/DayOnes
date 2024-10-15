import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Modal,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { BASEURL } from '../../assets/constants';
import ProfilePictureButton from '../../assets/components/ProfilePictureButton';

const MyCollectionsPage = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const profile = useSelector((state) => state.userProfile) || { username: 'unknown' };
  const accessToken = useSelector((state) => state.accessToken);

  const fetchArtistPosts = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/v1/post/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setPosts(response.data?.data?.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      Alert.alert('Error', 'An error occurred while fetching posts.');
    }
  };

  // Refetch collection whenever page is focused
  useFocusEffect(
    useCallback(() => {
      fetchArtistPosts();
    }, [])
  );

  const toggleLike = async (postId, isLiked) => {
    try {
      if (!isLiked) {
        await axios.post(
          `${BASEURL}/api/v1/post/${postId}/likes`,
          {},
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
      } else {
        await axios.delete(`${BASEURL}/api/v1/post/${postId}/likes`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      }

      // Update the post's liked status locally without refetching
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, liked: !isLiked } : post
        )
      );
    } catch (error) {
      if (error.response && error.response.status === 409) {
        await axios.delete(`${BASEURL}/api/v1/post/${postId}/likes`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, liked: false } : post
          )
        );
      } else {
        console.error("Error liking post:", error);
      }
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
        { headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Comment added", commentText);
        setCommentText("");
        setIsModalVisible(false);
      } else {
        Alert.alert("Error", "Unexpected response from the server.");
      }
    } catch (error) {
      let errorMessage = "Unable to add comment.";
      if (error.response && error.response.data?.message) {
        errorMessage = error.response.data.message;
      }
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <ProfilePictureButton navigation={navigation} />
      <Text style={styles.pageTitle}>My Collection</Text>
      <ScrollView style={styles.scrollView}>
        {posts.length === 0 ? (
          <Text style={styles.noPostsText}>Nothing in your collection right now</Text>
        ) : (
          posts.map((post, index) => (
            <View key={index} style={styles.postContainer}>
              <Text style={styles.postUser}>{post.locale || 'Unknown Location'}</Text>
              <TouchableOpacity onPress={() => Alert.alert('Post Data', JSON.stringify(post))}>
                {post.image_url && (
                  <Image source={{ uri: post.image_url }} style={styles.postImage} />
                )}
              </TouchableOpacity>
              <Text style={styles.postText}>{post.message}</Text>
              <View style={styles.interactionContainer}>
                <TouchableOpacity onPress={() => toggleLike(post.id, post.liked)}>
                  <Icon
                    name="heart"
                    size={30}
                    color={post.liked ? "#FF0000" : "#FFFFFF"} // Change color based on liked status
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  setSelectedPostId(post.id);
                  setIsModalVisible(true);
                }}>
                  <Icon name="comment" size={30} color="#FFFFFF" style={styles.commentIcon} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
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
  noPostsText: { fontSize: 18, color: '#ffffff', textAlign: 'center', marginVertical: 20 },
  postContainer: { marginBottom: 20 },
  postUser: { fontSize: 16, color: '#ffffff', marginBottom: 5, fontWeight: 'bold', paddingLeft: 5 },
  postImage: { width: '100%', height: 400 },
  interactionContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10, paddingLeft: 5 },
  interactionText: { fontSize: 16, color: '#FF0080', marginLeft: 5 },
  commentIcon: { marginLeft: 20 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  button: { backgroundColor: '#FF0080', padding: 15, borderRadius: 25, alignItems: 'center', shadowColor: '#FF0080', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.8, shadowRadius: 8, elevation: 5 },
  buttonText: { fontSize: 18, color: '#ffffff', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '80%', backgroundColor: '#fff', borderRadius: 10, padding: 20, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  modalInput: { width: '100%', height: 40, borderColor: '#ddd', borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 20 },
  modalButtonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  submitButton: { flex: 1, backgroundColor: '#FF0080', paddingVertical: 10, borderRadius: 5, alignItems: 'center', marginRight: 5 },
  cancelButton: { flex: 1, backgroundColor: '#888', paddingVertical: 10, borderRadius: 5, alignItems: 'center', marginLeft: 5 },
});

export default MyCollectionsPage;
