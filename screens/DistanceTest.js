import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';

const DistanceTest = ({ navigation }) => {
  // Access geolocation data from Redux store
  const locationData = useSelector(state => state.geolocationData);

  // Function to send data to AWS Lambda via HTTP
  const sendLocationData = async () => {
    const data = {
      geohash: locationData.geohash,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    };

    try {
      const response = await fetch('https://a55yh6pw6pks3fc7vtlfs65tli0ujdlf.lambda-url.us-east-1.on.aws/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.length > 0) {
          // Parse and format the first post's data (you can iterate over all posts if needed)
          const post = result[0];

          // Convert the CreatedAt timestamp to the device's local timezone
          const date = new Date(post.CreatedAt).toLocaleString();

          const formattedResponse = `
            User: ${post.UserName}
            Content: ${post.Content}
            Max Distance: ${post.Distance} feet
            Latitude: ${post.Lat}
            Longitude: ${post.Lon}
            Geohash: ${post.Geohash}
            Date: ${date}
          `;
          Alert.alert("Current Posts Near You", formattedResponse);
        } else {
          Alert.alert("Sorry", "No nearby posts found.");
        }
      } else {
        Alert.alert("Error", "Failed to invoke Lambda function");
      }
    } catch (error) {
      console.error("Error invoking Lambda function", error);
      Alert.alert("Error", "An unexpected error occurred");
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      {/* Geolocation Data (Shrunk and Positioned at the Top) */}
      <View style={styles.geoDataContainer}>
        <Text style={styles.label}>Lat: {locationData.latitude}</Text>
        <Text style={styles.label}>Lon: {locationData.longitude}</Text>
        <Text style={styles.label}>Locale: {locationData.locale}</Text>
        <Text style={styles.label}>Geohash: {locationData.geohash}</Text>
      </View>

      {/* Main Content of the Distance Test Page */}
      <View style={styles.mainContent}>
        <Text style={styles.mainLabel}>Distance Test Page</Text>

        {/* Button to send location data to Lambda */}
        <TouchableOpacity onPress={sendLocationData} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Get Posts Near You</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: '#007AFF',
  },
  geoDataContainer: {
    alignSelf: 'stretch',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainLabel: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sendButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default DistanceTest;
