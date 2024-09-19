import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import Geocoder from 'react-native-geocoder-reborn';
import geohash from 'ngeohash';
import store from '../redux/store';
import { setGeolocationData } from '../reduxStore/actions';

let watchId;

const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
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
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else if (Platform.OS === 'ios') {
    const authStatus = await Geolocation.requestAuthorization('whenInUse');
    return authStatus === 'granted';
  }
  return false;
};

const startWatchingLocation = async () => {
  const permissionGranted = await requestLocationPermission();
  if (permissionGranted) {
    watchId = Geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const timestamp = new Date(position.timestamp).toISOString();
        const locationGeohash = geohash.encode(latitude, longitude, 6);

        try {
          const locale = await getLocale(latitude, longitude);
          store.dispatch(setGeolocationData({
            timestamp,
            latitude,
            longitude,
            locale,
            geohash: locationGeohash,
          }));
        } catch (error) {
          console.error("Error getting locale", error);
          Alert.alert("Error", "Failed to get the locale.");
        }
      },
      (error) => {
        console.error('Error watching location', error);
        Alert.alert('Location Error', error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 10000, // 10 seconds
        fastestInterval: 5000, // Fastest interval of 5 seconds
      }
    );
  } else {
    Alert.alert("Permission Denied", "Location permission not granted.");
  }
};

const stopWatchingLocation = () => {
  if (watchId !== null && watchId !== undefined) {
    Geolocation.clearWatch(watchId);
    watchId = null;
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
