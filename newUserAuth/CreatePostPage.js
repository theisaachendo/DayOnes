import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useSelector } from 'react-redux';
import { uploadToS3 } from '../assets/components/uploadToS3'; // Import the S3 upload function

const CreatePostPage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [sliderValue, setSliderValue] = useState([100]);
  const userProfile = useSelector(state => state.userProfile) || { username: 'unknown' };
  const geolocationData = useSelector(state => state.geolocationData) || { latitude: 0.0, longitude: 0.0 };
  const accessToken = useSelector(state => state.accessToken);

  const handleUploadImage = async () => {
    const uploadedImageUrl = await uploadToS3(imageUrl, userProfile.username);
    if (uploadedImageUrl) {
      setImageUrl(uploadedImageUrl); // Update imageUrl with the S3 link if upload is successful
    }
  };

  const createPost = async () => {
    if (!imageUrl) {
      alert("Please provide an image URL.");
      return;
    }

    const postData = {
      imageUrl,
      range: sliderValue[0],
      type: "PHOTO_ONLY",
      latitude: geolocationData.latitude.toString(),
      longitude: geolocationData.longitude.toString(),
      locale: geolocationData.locale || 'US',
    };

    try {
      const response = await fetch(`${BASEURL}/api/v1/post/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(postData),
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        alert('Post created successfully!');
      } else {
        alert(`Failed to create post: ${jsonResponse.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert('An error occurred while creating the post.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create a New Post</Text>

      <TouchableOpacity
        style={[styles.button, styles.uploadButton]}
        onPress={handleUploadImage}
      >
        <Text style={styles.buttonText}>Upload Image to S3</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Image URL"
        placeholderTextColor="#888"
        value={imageUrl}
        onChangeText={setImageUrl}
      />

      <Text style={styles.sliderLabel}>Range: {sliderValue[0]} feet</Text>
      <MultiSlider
        values={sliderValue}
        sliderLength={280}
        onValuesChange={(value) => setSliderValue(value)}
        min={10}
        max={2000}
        step={10}
        selectedStyle={styles.sliderSelectedStyle}
        unselectedStyle={styles.sliderUnselectedStyle}
        trackStyle={styles.sliderTrackStyle}
        markerStyle={styles.sliderMarkerStyle}
      />
      <TouchableOpacity style={styles.button} onPress={createPost}>
        <Text style={styles.buttonText}>Create Post</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#fff',
    marginBottom: 20,
    fontSize: 16,
  },
  sliderLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  sliderSelectedStyle: {
    backgroundColor: '#ff8800',
  },
  sliderUnselectedStyle: {
    backgroundColor: '#555',
  },
  sliderTrackStyle: {
    height: 10,
  },
  sliderMarkerStyle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#ff8800',
  },
  button: {
    backgroundColor: '#ff8800',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  uploadButton: {
    backgroundColor: '#007bff',
    marginBottom: 20,
  },
});

export default CreatePostPage;
