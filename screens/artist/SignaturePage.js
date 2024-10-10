import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASEURL } from '../../assets/constants';


const SignaturePage = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const accessToken = useSelector(state => state.accessToken);

  const userProfile = useSelector(state => state.userProfile) || {
    username: 'unknown',
    fullName: 'Unknown User',
  };

  const options = {
    mediaType: 'photo',
    includeBase64: true,
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

  const createSignature = async () => {
    if (!selectedImage) {
      Alert.alert("Please take a picture or upload a file.");
      return;
    }

    const imageUrl = 'https://picsum.photos/seed/picsum/200/300'; // Assuming the image URI is a URL

    try {
      const response = await axios.post(
        `${BASEURL}/api/v1/signature/create`,
        new URLSearchParams({ url: imageUrl }).toString(), // Use URL-encoded data
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Signature created successfully!');
      } else {
        console.error('Failed to create signature:', response.data);
        Alert.alert('Error', 'Failed to create signature.');
      }
    } catch (error) {
      console.error('Error creating signature:', error);
      Alert.alert('Error', 'Error creating signature.');
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
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.buttonText}>Take Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={uploadFile}>
          <Text style={styles.buttonText}>Upload File</Text>
        </TouchableOpacity>
      </View>
      {selectedImage && (
        <View>
          <Image source={{ uri: selectedImage.uri }} style={styles.image} />
          <TouchableOpacity style={styles.uploadButton} onPress={createSignature}>
            <Text style={styles.uploadButtonText}>Create Signature</Text>
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
