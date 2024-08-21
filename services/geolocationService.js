// services/geolocationService.js
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import Geocoder from 'react-native-geocoder-reborn';
import geohash from 'ngeohash';
import store from '../redux/store';
import { setGeolocationData } from '../redux/actions';

let watchId; // Declare the watchId variable globally within this module

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
    watchId = Geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const timestamp = new Date(position.timestamp).toISOString();

        const locationGeohash = geohash.encode(latitude, longitude, 6);

        try {
          const locale = await getLocale(latitude, longitude);
          store.dispatch(setGeolocationData({ timestamp, latitude, longitude, locale, geohash: locationGeohash }));
        } catch (error) {
          console.error("Error getting locale", error);
          Alert.alert("Error", "Failed to get the locale. Please check the logs for details.");
        }
      },
      (error) => {
        console.error('Error watching location', error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 10000, // Set interval to 10 seconds (10000 milliseconds)
        fastestInterval: 10000, // Ensure the fastest interval is also 10 seconds
      }
    );
  }
};

const stopWatchingLocation = () => {
  if (watchId !== null && watchId !== undefined) {
    Geolocation.clearWatch(watchId); // Ensure watchId is passed to clearWatch
    watchId = null; // Reset the watchId after clearing the watch
  }
};

const getLocale = async (latitude, longitude) => {
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

export { startWatchingLocation, stopWatchingLocation };
