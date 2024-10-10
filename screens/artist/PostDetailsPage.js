import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { BASEURL } from '../../assets/constants';
import { useSelector } from 'react-redux';

const PostDetailsPage = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const accessToken = useSelector(state => state.accessToken); // Get access token from state if required

  const fetchPostDetails = async () => {
    try {
        const response = await axios.get(`${BASEURL}/api/v1/post/4a9eeaa2-0a97-4204-9b69-cce1aac79beb`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPost(response.data?.data);
      } catch (error) {
        console.error("Error fetching post details:", error.response?.status, error.response?.data);
        Alert.alert('Error', 'Unable to load post details');
      }

  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {post && (
        <>
          {post.image_url && <Image source={{ uri: post.image_url }} style={styles.image} />}
          <Text style={styles.details}>{JSON.stringify(post, null, 2)}</Text>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: '#fff', alignItems: 'center' },
  image: { width: '100%', height: 400, marginBottom: 10 },
  details: { fontSize: 14, color: '#333', textAlign: 'left' },
});

export default PostDetailsPage;
