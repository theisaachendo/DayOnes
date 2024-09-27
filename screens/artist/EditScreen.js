import React, { useState, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions, FlatList, Alert, PanResponder, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { setSignatureColor, setSignatureSize } from '../../redux/actions';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import { useSignatures } from '../../hooks/useSignatures';

const { width, height } = Dimensions.get('window');

const EditScreen = ({ route, navigation }) => {
  const { selectedImage } = route.params;
  const [selectedSignature, setSelectedSignature] = useState(null);
  const [draggedSignaturePosition, setDraggedSignaturePosition] = useState(new Animated.ValueXY({ x: width * 0.6, y: height * 0.55 }));
  const [lastPosition, setLastPosition] = useState({ x: width * 0.6, y: height * 0.55 });
  const lastTap = useRef(null);
  const signatureColor = useSelector(state => state.signatureColor);
  const signatureSize = useSelector(state => state.signatureSize);
  const [activeTab, setActiveTab] = useState(0);
  const viewShotRef = useRef(null);
  const username = useSelector(state => state.userProfile.username) || 'unknown';
  const dispatch = useDispatch();

  const { data: signatures, isLoading, isError } = useSignatures(username);

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
    const startX = (width - signatureSize.width) / 2;
    const startY = (height * 0.75 - signatureSize.height) / 2;
    setDraggedSignaturePosition(new Animated.ValueXY({ x: startX, y: startY }));
    setLastPosition({ x: startX, y: startY });
    setActiveTab(2);
  };

  const handleDoubleTap = () => {
    const smallSize = { width: width * 0.30, height: height * 0.30 };
    const mediumSize = { width: width * 0.40, height: height * 0.40 };
    const largeSize = { width: width * 0.55, height: height * 0.55 };

    if (signatureSize.width === smallSize.width) {
      dispatch(setSignatureSize(mediumSize));
    } else if (signatureSize.width === mediumSize.width) {
      dispatch(setSignatureSize(largeSize));
    } else {
      dispatch(setSignatureSize(smallSize));
    }
  };

  const handleTap = () => {
    const now = Date.now();
    if (lastTap.current && (now - lastTap.current) < 300) {
      handleDoubleTap();
    }
    lastTap.current = now;
  };

  const applyColorToSignature = (color) => {
    dispatch(setSignatureColor(color));
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

  const handleCancel = () => {
    navigation.goBack();
  };

  const renderTabContent = () => {
    if (isLoading) {
      return <Text>Loading...</Text>;
    }

    if (isError) {
      return <Text>Error loading signatures. Please try again later.</Text>;
    }

    return (
      <View style={styles.tabContentOverlay}>
        <View style={[styles.tabContent, { display: activeTab === 0 ? 'flex' : 'none' }]}>
          <FlatList
            horizontal
            data={signatures}
            renderItem={renderSignature}
            keyExtractor={item => item.Key}
            contentContainerStyle={styles.signaturesList}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={[styles.tabContent, { display: activeTab === 1 ? 'flex' : 'none' }]}>
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
        <View style={[styles.tabContent, { display: activeTab === 2 ? 'flex' : 'none' }]}>
          <View style={styles.saveContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={captureAndSaveImage}>
              <Icon name="save" size={24} color="#fff" />
              <Text style={styles.saveButtonText}>Save Picture</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderSignature = ({ item }) => (
    <TouchableOpacity onPress={() => handleSignatureSelect(item)}>
      <Image source={{ uri: item.Url }} style={styles.signatureThumbnail} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Icon name="times" size={24} color="#fff" />
      </TouchableOpacity>
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
                    elevation: 10,
                  },
                ]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </Animated.View>
        )}
      </ViewShot>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tabButton, activeTab === 0 && styles.activeTab]} onPress={() => setActiveTab(0)}>
          <Text style={styles.tabText}>Signatures</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab === 1 && styles.activeTab]} onPress={() => setActiveTab(1)}>
          <Text style={styles.tabText}>Color</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab === 2 && styles.activeTab]} onPress={() => setActiveTab(2)}>
          <Text style={styles.tabText}>Save</Text>
        </TouchableOpacity>
      </View>

      {renderTabContent()}
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
  cancelButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 100, // Ensure it appears above other elements
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 20,
  },
  viewShot: {
    width: width,
    height: height * 0.62,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#333',
    width: '100%',
    paddingVertical: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#555',
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabContentOverlay: {
    position: 'relative',
    width: '100%',
    height: 150, // Ensure consistent height
  },
  tabContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap', // This allows the items to wrap into multiple rows
    width: '80%', // Adjust the width to fit the buttons nicely
    marginTop: 10, // Optional: add margin at the top
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 10, // Added marginVertical to create space between rows
  },

  saveContainer: {
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#FF0080',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  signaturesList: {
    paddingLeft: 10,
    paddingTop: 15
  },
  signatureThumbnail: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  signatureContainer: {
    position: 'absolute',
    zIndex: 10,
  },
  signatureImage: {
    shadowOffset: { width: 0, height: 0 },
  },
});

export default EditScreen;
