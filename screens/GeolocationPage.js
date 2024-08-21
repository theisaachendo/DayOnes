import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const GeoLocationPage = ({ navigation }) => {
  const locationData = useSelector(state => state.geolocationData);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Current Location:</Text>
      <Text style={styles.label}>Latitude: {locationData.latitude}</Text>
      <Text style={styles.label}>Longitude: {locationData.longitude}</Text>
      <Text style={styles.label}>Locale: {locationData.locale}</Text>
      <Text style={styles.label}>Geohash: {locationData.geohash}</Text>
      <Text style={styles.label}>Timestamp: {locationData.timestamp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: '#007AFF',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default GeoLocationPage;
