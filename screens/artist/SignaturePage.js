import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Alert, PermissionsAndroid, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import axios from 'axios';

const SignaturePage = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);

  const userProfile = useSelector(state => state.userProfile) || {
    username: 'unknown',
    fullName: 'Unknown User',
  };

  const options = {
    mediaType: 'photo',
    includeBase64: true,
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission to take pictures',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
          takePicture();
        } else {
          console.log('Camera permission denied');
          Alert.alert('Permission Denied', 'Camera permission is required to take pictures.');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      takePicture(); // For iOS or other platforms, proceed without explicit permission request
    }
  };

  const takePicture = () => {
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  const uploadFile = () => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  const uploadToS3 = async () => {
    if (!selectedImage) {
      alert("Please take a picture or upload a file.");
      return;
    }

    if (!userProfile || !userProfile.username || userProfile.username === 'unknown') {
      alert("User information is missing.");
      return;
    }

    const lambdaUrl = `https://72ae811to2.execute-api.us-east-1.amazonaws.com/default/signatureUpload`;

    const uploadData = {
      username: userProfile.username,
      imageBase64: selectedImage.base64,
      fileName: selectedImage.fileName || 'image.jpg',
    };

    try {
      const response = await axios.post(lambdaUrl, uploadData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('Image uploaded successfully!');
      } else {
        console.error('Failed to upload image:', response.data);
        alert('Failed to upload image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topRightButton}
          onPress={() => navigation.navigate('ArtistSignatures')}
        >
          <Text style={styles.topRightButtonText}>My Signatures</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Signature Test Screen</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={requestCameraPermission}>
          <Text style={styles.buttonText}>Take Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={uploadFile}>
          <Text style={styles.buttonText}>Upload File</Text>
        </TouchableOpacity>
      </View>
      {selectedImage && (
        <View>
          <Image
            source={{ uri: selectedImage.uri }}
            style={styles.image}
          />
          <TouchableOpacity style={styles.uploadButton} onPress={uploadToS3}>
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#001F3F',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#00FFFF',
    fontSize: 16,
  },
  topRightButton: {
    padding: 10,
    backgroundColor: '#FF5733',
    borderRadius: 5,
  },
  topRightButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#001F3F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
  },
  buttonText: {
    color: '#00FFFF',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#FF0080',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SignaturePage;
