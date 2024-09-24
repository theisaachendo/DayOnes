import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions, FlatList, Alert, PanResponder, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

const EditScreen = ({ route, navigation }) => {
  const { selectedImage } = route.params; // Get the image object from navigation parameters
  const [signatures, setSignatures] = useState([]);
  const [selectedSignature, setSelectedSignature] = useState(null);
  const [draggedSignaturePosition, setDraggedSignaturePosition] = useState(new Animated.ValueXY());

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
      // Handle logic after dropping the signature, if needed
    },
  });

  const handleSignatureSelect = (item) => {
    setSelectedSignature(item);
    setDraggedSignaturePosition(new Animated.ValueXY()); // Reset position when a new signature is selected
  };

  const handleSave = () => {
    // Simulate saving changes; in a real app, you would process the changes here
    const editedImage = { ...selectedImage, selectedSignature };
    navigation.navigate('HHomePage', { editedImage });
  };

  const renderSignature = ({ item }) => (
    <TouchableOpacity onPress={() => handleSignatureSelect(item)}>
      <Image source={{ uri: item.Url }} style={styles.signatureThumbnail} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: selectedImage.uri }} style={styles.image} />
      {selectedSignature && (
        <Animated.View
          style={[styles.signatureContainer, draggedSignaturePosition.getLayout()]}
          {...panResponder.panHandlers}
        >
          <Image source={{ uri: selectedSignature.Url }} style={styles.signatureImage} resizeMode="contain" />
        </Animated.View>
      )}

      <View style={styles.toolbar}>
        <FlatList
          horizontal
          data={signatures}
          renderItem={renderSignature}
          keyExtractor={item => item.Key}
          contentContainerStyle={styles.signaturesList}
          showsHorizontalScrollIndicator={false}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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
  image: {
    width: width,
    height: height * 0.7,
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
    width: 100,
    height: 100,
  },
});

export default EditScreen;
