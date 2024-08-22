import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const DistanceTest = ({ navigation }) => {
  // Access geolocation data from Redux store
  const locationData = useSelector(state => state.geolocationData);

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
        <Text style={styles.label}>Locale: {locationData.geohash}</Text>
      </View>

      {/* Main Content of the Distance Test Page */}
      <View style={styles.mainContent}>
        <Text style={styles.mainLabel}>Distance Test Page</Text>
        {/* Add any additional content for Distance Test here */}
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
});

export default DistanceTest;
