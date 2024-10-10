// components/CommentSection.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { BASEURL } from '../../assets/constants';

const CommentSection = ({ postId, accessToken, closeModal }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [commentText, setCommentText] = useState("");

  const addComment = async () => {
    if (!commentText) {
      Alert.alert("Error", "Comment cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(
        `${BASEURL}/api/v1/post/${postId}/comment`,
        { message: commentText },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (response.status === 201) {
        Alert.alert("Comment added", commentText);
        setCommentText("");
        setIsModalVisible(false);
        if (closeModal) closeModal();
      } else {
        Alert.alert("Error", "Unexpected response from the server.");
      }
    } catch (error) {
      console.log("Error adding comment:", error);
      Alert.alert("Error", "Unable to add comment.");
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Text style={styles.commentButtonText}>Comment</Text>
      </TouchableOpacity>
      <Modal transparent={true} visible={isModalVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add a Comment</Text>
            <TextInput
              style={styles.modalInput}
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Type your comment"
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.submitButton} onPress={addComment}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '80%', backgroundColor: '#fff', borderRadius: 10, padding: 20, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  modalInput: { width: '100%', height: 40, borderColor: '#ddd', borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 20 },
  modalButtonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  submitButton: { flex: 1, backgroundColor: '#FF0080', paddingVertical: 10, borderRadius: 5, alignItems: 'center', marginRight: 5 },
  cancelButton: { flex: 1, backgroundColor: '#888', paddingVertical: 10, borderRadius: 5, alignItems: 'center', marginLeft: 5 },
  commentButtonText: { color: '#FF0080', fontSize: 16, textAlign: 'center', marginTop: 10 },
  submitText: { color: '#fff' },
  cancelText: { color: '#fff' },
});

export default CommentSection;
