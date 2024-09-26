import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions, FlatList, Alert, PanResponder, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';

const { width, height } = Dimensions.get('window');

const EditScreen = ({ route, navigation }) => {
  const { selectedImage } = route.params;
  const [signatures, setSignatures] = useState([]);
  const [selectedSignature, setSelectedSignature] = useState(null);
  const [draggedSignaturePosition, setDraggedSignaturePosition] = useState(new Animated.ValueXY());
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [signatureSize, setSignatureSize] = useState({ width: 450, height: 450 });
  const [lastTap, setLastTap] = useState(null);
  const [signatureColor, setSignatureColor] = useState('#FF0000'); // Default color
  const viewShotRef = useRef(null);

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
      draggedSignaturePosition.flattenOffset();
      setLastPosition({ x: draggedSignaturePosition.x._value, y: draggedSignaturePosition.y._value });
    },
    onPanResponderGrant: () => {
      draggedSignaturePosition.setOffset({ x: lastPosition.x, y: lastPosition.y });
      draggedSignaturePosition.setValue({ x: 0, y: 0 });
    },
  });

  const handleSignatureSelect = (item) => {
    setSelectedSignature(item);
    setDraggedSignaturePosition(new Animated.ValueXY({ x: lastPosition.x, y: lastPosition.y }));
  };

  const handleDoubleTap = () => {
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
      handleDoubleTap();
    }
    setLastTap(now);
  };

  const applyColorToSignature = (color) => {
    setSignatureColor(color);
  };

  const captureAndSaveImage = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const newFilePath = `${RNFS.DocumentDirectoryPath}/edited_image_${Date.now()}.jpg`;

      await RNFS.moveFile(uri, newFilePath);

      Alert.alert('Success', 'Image saved successfully!');
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
                style={[
                  styles.signatureImage,
                  signatureSize,
                  {
                    tintColor: signatureColor,
                    shadowColor: signatureColor,
                    shadowRadius: 10,
                    shadowOpacity: 1.0,
                    shadowOffset: { width: 0, height: 0 },
                    elevation: 10, // For Android to apply shadow effect
                  },
                ]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </Animated.View>
        )}
      </ViewShot>

      <View style={styles.colorPickerContainer}>
        <View style={styles.colorOptions}>
          {['#FFFFFF', '#FF00FF', '#00FF00', '#00FFFF', '#FFFF00', '#FF0000'].map((color) => (
            <TouchableOpacity
              key={color}
              style={[styles.colorButton, { backgroundColor: color }]}
              onPress={() => applyColorToSignature(color)}
            />
          ))}
        </View>
      </View>

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
    width: width,
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
    shadowOffset: { width: 0, height: 0 }, // Shadow offset for the glow effect
  },
  colorPickerContainer: {
    marginVertical: 20,
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
});

export default EditScreen;
