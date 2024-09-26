import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions, FlatList, Alert, PanResponder, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs'; // For file saving and manipulation

const { width, height } = Dimensions.get('window');

const EditScreen = ({ route, navigation }) => {
  const { selectedImage } = route.params;
  const [signatures, setSignatures] = useState([]);
  const [selectedSignature, setSelectedSignature] = useState(null);
  const [draggedSignaturePosition, setDraggedSignaturePosition] = useState(new Animated.ValueXY());
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [signatureSize, setSignatureSize] = useState({ width: 450, height: 450 }); // Default size
  const [lastTap, setLastTap] = useState(null);
  const viewShotRef = useRef(null); // Reference for capturing the view

  const username = useSelector(state => state.userProfile.username) || 'unknown';

  useEffect(() => {
    fetchSignatures();
  }, []);

  const fetchSignatures = async () => {
    try {
      const response = await axios.get('https://x4d3fe2tppuqjgz5zysgqi4sre0lpmmx.lambda-url.us-east-1.on.aws/', {
        params: {
          artistUsername: username,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setSignatures(response.data.data);
      } else {
        Alert.alert('Error', 'Failed to fetch signatures. Please try again later.');
      }
    } catch (error) {
      Alert.alert('Error', `Error fetching signatures: ${error.response?.data?.error || error.message}`);
    }
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: draggedSignaturePosition.x, dy: draggedSignaturePosition.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      // Save the last known position when dragging stops
      draggedSignaturePosition.flattenOffset();
      setLastPosition({ x: draggedSignaturePosition.x._value, y: draggedSignaturePosition.y._value });
    },
    onPanResponderGrant: () => {
      // Set the starting offset to the last known position
      draggedSignaturePosition.setOffset({ x: lastPosition.x, y: lastPosition.y });
      draggedSignaturePosition.setValue({ x: 0, y: 0 });
    },
  });

  const handleSignatureSelect = (item) => {
    setSelectedSignature(item);
    setDraggedSignaturePosition(new Animated.ValueXY({ x: lastPosition.x, y: lastPosition.y }));
  };

  const handleDoubleTap = () => {
    // Toggle between three sizes: default (450x450), larger (600x600), and smaller (350x350)
    if (signatureSize.width === 450) {
      setSignatureSize({ width: 600, height: 600 });
    } else if (signatureSize.width === 600) {
      setSignatureSize({ width: 350, height: 350 });
    } else {
      setSignatureSize({ width: 450, height: 450 });
    }
  };

  const handleTap = () => {
    const now = Date.now();
    if (lastTap && (now - lastTap) < 300) {
      // Double tap detected
      handleDoubleTap();
    }
    setLastTap(now);
  };

  const captureAndSaveImage = async () => {
    try {
      const uri = await viewShotRef.current.capture(); // Capture the view as an image
      const newFilePath = `${RNFS.DocumentDirectoryPath}/edited_image_${Date.now()}.jpg`; // Ensure unique file name

      // Save captured image to local filesystem
      await RNFS.moveFile(uri, newFilePath);

      Alert.alert('Success', 'Image saved successfully!');
      // Pass the new image path to the home screen for invites
      navigation.navigate('HHomePage', { editedImage: { uri: `file://${newFilePath}`, base64: await RNFS.readFile(newFilePath, 'base64') } });
    } catch (error) {
      console.error('Error capturing and saving image:', error);
      Alert.alert('Error', 'Failed to save the image. Please try again.');
    }
  };

  const renderSignature = ({ item }) => (
    <TouchableOpacity onPress={() => handleSignatureSelect(item)}>
      <Image source={{ uri: item.Url }} style={styles.signatureThumbnail} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }} style={styles.viewShot}>
        <Image source={{ uri: selectedImage.uri }} style={styles.image} />
        {selectedSignature && (
          <Animated.View
            style={[styles.signatureContainer, draggedSignaturePosition.getLayout()]}
            {...panResponder.panHandlers}
          >
            <TouchableOpacity activeOpacity={1} onPress={handleTap}>
              <Image
                source={{ uri: selectedSignature.Url }}
                style={[styles.signatureImage, signatureSize]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </Animated.View>
        )}
      </ViewShot>

      <View style={styles.toolbar}>
        <FlatList
          horizontal
          data={signatures}
          renderItem={renderSignature}
          keyExtractor={item => item.Key}
          contentContainerStyle={styles.signaturesList}
          showsHorizontalScrollIndicator={false}
        />
        <TouchableOpacity style={styles.saveButton} onPress={captureAndSaveImage}>
          <Icon name="save" size={24} color="#fff" />
          <Text style={styles.saveButtonText}>Save & Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewShot: {
    width: width, // Ensures the ViewShot only captures the image and signature
    height: height * 0.7,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  toolbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#FF0080',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  signaturesList: {
    paddingLeft: 10,
  },
  signatureThumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  signatureContainer: {
    position: 'absolute',
    zIndex: 10,
  },
  signatureImage: {
    // Signature sizes managed by state
  },
});

export default EditScreen;
