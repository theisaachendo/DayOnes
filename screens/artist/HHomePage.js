import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MultiSlider from '@ptomasroos/react-native-multi-slider';  // Importing the multi-slider package
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const HHomePage = () => {
  const [sliderValue, setSliderValue] = useState([10]);

  // Function to convert feet to meters
  const feetToMeters = (feet) => {
    return (feet * 0.3048).toFixed(0); // Convert to meters and round to nearest integer
  };

  const takePicture = () => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      (response) => {
        if (response.didCancel) {
          Alert.alert('Cancelled', 'User cancelled camera picker');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage);
        } else {
          console.log(response.uri);
          // Handle navigation to the photo review page
        }
      }
    );
  };

  const uploadPicture = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response) => {
        if (response.didCancel) {
          Alert.alert('Cancelled', 'User cancelled image picker');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage);
        } else {
          console.log(response.uri);
          // Handle navigation to the photo review page
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Autographs & Invites</Text>
      </View>

      <View style={styles.pictureContainer}>
        <TouchableOpacity style={styles.pictureButton} onPress={takePicture}>
          <Icon name="camera" size={30} color="#FFFFFF" style={styles.icon} />
          <Text style={styles.buttonText}>Click Selfie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pictureButton} onPress={uploadPicture}>
          <Icon name="picture-o" size={30} color="#FFFFFF" style={styles.icon} />
          <Text style={styles.buttonText}>Upload Pic</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sliderLabel}>Adjust Distance (Feet to Meters):</Text>

      <MultiSlider
        values={sliderValue}
        sliderLength={300}
        onValuesChange={(value) => setSliderValue(value)}
        min={10}
        max={2000}
        step={10}  // Step of 10 feet
        selectedStyle={styles.sliderSelectedStyle}
        unselectedStyle={styles.sliderUnselectedStyle}
        trackStyle={styles.sliderTrackStyle}
        markerStyle={styles.sliderMarkerStyle}
      />

      {/* Show both feet and meters */}
      <Text style={styles.sliderValue}>Distance: {sliderValue[0]} feet ({feetToMeters(sliderValue[0])} meters)</Text>


      <TouchableOpacity style={styles.sendButton}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // DefaultBlack background
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  pictureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  pictureButton: {
    width: 162,
    height: 115,
    backgroundColor: '#123544',
    borderColor: '#00FFFF', // DefaultCyan equivalent
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sliderLabel: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  sliderSelectedStyle: {
    backgroundColor: '#7B1FA2', // Updated color to make it more vibrant
    borderRadius: 8,
  },
  sliderUnselectedStyle: {
    backgroundColor: '#333', // Darker unselected portion for contrast
    borderRadius: 8,
  },
  sliderTrackStyle: {
    height: 10,
    borderRadius: 10,
    backgroundColor: '#444', // Add a background color to the track for better visibility
  },
  sliderMarkerStyle: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    backgroundColor: '#7B1FA2', // Consistent color for the marker
    borderWidth: 2,
    borderColor: '#fff', // White border for better visibility
  },
  sliderValue: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  sendButton: {
    backgroundColor: '#7B1FA2', // DefaultPurple equivalent
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HHomePage;
