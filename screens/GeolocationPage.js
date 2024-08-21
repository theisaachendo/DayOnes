import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';
import Geocoder from 'react-native-geocoder-reborn'; // Import the geocoder
import geohash from 'ngeohash'; // Import a geohash library

const GeoLocationPage = ({ navigation }) => {
  const [locationData, setLocationData] = useState({ timestamp: '', latitude: null, longitude: null, locale: '', geohash: '' });

  useEffect(() => {
    const watchId = startWatchingLocation();
    return () => {
      // Stop watching the location when the component is unmounted
      Geolocation.clearWatch(watchId);
    };
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS automatically handles permissions
  };

  const startWatchingLocation = async () => {
    const granted = await requestLocationPermission();
    if (granted) {
      const watchId = Geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const timestamp = new Date(position.timestamp).toISOString();

          // Calculate the geohash
          const locationGeohash = geohash.encode(latitude, longitude, 6);

          // Fetch the locale using Geocoder
          try {
            const locale = await getLocale(latitude, longitude);
            setLocationData({ timestamp, latitude, longitude, locale, geohash: locationGeohash });
          } catch (error) {
            console.error("Error getting locale", error);
            Alert.alert("Error", "Failed to get the locale. Please check the logs for details.");
          }
        },
        (error) => {
          console.error('Error watching location', error);
        },
        { enableHighAccuracy: true, distanceFilter: 0, interval: 5000, fastestInterval: 2000 }
      );
      return watchId;
    }
  };

  const getLocale = async (latitude, longitude) => {
    if (!Geocoder) {
      throw new Error("Geocoder is not initialized.");
    }

    try {
      const res = await Geocoder.geocodePosition({ lat: latitude, lng: longitude });
      if (res && res.length > 0) {
        const locality = res[0].locality || '';
        const adminArea = res[0].adminArea || '';
        return `${locality}, ${adminArea}`;
      }
      return 'Unknown location';
    } catch (error) {
      console.error('Error getting locale', error);
      return 'Error retrieving location';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with back arrow */}
      <View style={styles.header}>
        <Text onPress={() => navigation.goBack()} style={{ color: '#FFFFFF', fontSize: 40 }}>←</Text>
        <Text style={styles.title}>GeoLocation Testing</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.label}>Timestamp: {locationData.timestamp}</Text>
        <Text style={styles.label}>Latitude: {locationData.latitude}</Text>
        <Text style={styles.label}>Longitude: {locationData.longitude}</Text>
        <Text style={styles.label}>Locale: {locationData.locale}</Text>
        <Text style={styles.label}>Geohash: {locationData.geohash}</Text>
        <Button title="Refresh Location" onPress={startWatchingLocation} />
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10, // Space between the arrow and the title
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
  },
});

export default GeoLocationPage;
