import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const EditScreen = ({ route, navigation }) => {
  const { selectedImage } = route.params; // Get the image object from navigation parameters
  const [editText, setEditText] = useState('');
  const [signature, setSignature] = useState('');

  const handleAddText = () => {
    // Handle adding text
    Alert.alert("Add Text", "Functionality to add text goes here.");
  };

  const handleAddSignature = () => {
    // Handle adding signature
    Alert.alert("Add Signature", "Functionality to add signature goes here.");
  };

  const handleSave = () => {
    // Simulate saving changes; in a real app, you would process the changes here
    const editedImage = { ...selectedImage, editText, signature };
  
    // Ensure navigation back uses the correct route name as defined in App.js
    navigation.navigate('HHomePage', { editedImage });
  };
  

  return (
    <View style={styles.container}>
      <Image source={{ uri: selectedImage.uri }} style={styles.image} />

      <View style={styles.toolbar}>
        {/* Button to Add Text */}
        <TouchableOpacity style={styles.iconButton} onPress={handleAddText}>
          <Icon name="font" size={24} color="#fff" />
          <Text style={styles.iconLabel}>Text</Text>
        </TouchableOpacity>

        {/* Button to Add Signature */}
        <TouchableOpacity style={styles.iconButton} onPress={handleAddSignature}>
          <Icon name="pencil" size={24} color="#fff" />
          <Text style={styles.iconLabel}>Signature</Text>
        </TouchableOpacity>

        {/* Save Button */}
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
    padding: 20,
    backgroundColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconButton: {
    alignItems: 'center',
    padding: 10,
  },
  iconLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: '#FF0080',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default EditScreen;
