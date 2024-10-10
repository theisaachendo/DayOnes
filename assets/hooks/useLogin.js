import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAccessToken, setUserID, setFcmToken } from '../redux/actions';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Geolocation from '@react-native-community/geolocation'; // Make sure to install this dependency
import { BASEURL } from '../constants';

const loginUser = async ({ email, password }) => {
  console.log('loginUser called with:', { email, password });

  try {
    const response = await axios.post(`${BASEURL}/api/v1/auth/signin`, {
      username: email,
      password,
    });
    console.log('API response:', response.data);

    const token = response.data?.data?.access_token;
    const userID = response.data?.data?.user?.id;
    const fullName = response.data?.data?.user?.full_name;
    console.log('Extracted values:', { token, userID, fullName });

    if (typeof token === 'string' && typeof userID === 'string') {
      return { token, userID, fullName };
    } else {
      throw new Error('Access token or User ID not found');
    }
  } catch (error) {
    console.log('Error in loginUser:', error);
    throw error.response ? error.response.data.message : 'Network error. Please check your connection.';
  }
};

const updateNotificationToken = async (token, notificationToken) => {
  try {
    const response = await axios.post(
      `${BASEURL}/api/v1/user-notification/token`,
      new URLSearchParams({ notificationToken }).toString(),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    console.log('Notification token updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating notification token:', error);
    throw new Error('Failed to update notification token.');
  }
};

const updateLocation = async (token, latitude, longitude) => {
  try {
    const response = await axios.post(
      `${BASEURL}/api/v1/user/update-location`,
      new URLSearchParams({ latitude, longitude }).toString(),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    console.log('Location updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating location:', error);
    throw new Error('Failed to update location.');
  }
};

const useLogin = () => {
  const dispatch = useDispatch();

  // Function to get the FCM token and store it in Redux
  const getFcmToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      console.log('Retrieved FCM Token:', fcmToken); // Log the FCM token
      dispatch(setFcmToken(fcmToken));
      return fcmToken;
    } catch (error) {
      console.error('Failed to get FCM token:', error);
      return null;
    }
  };

  // Function to get the user's current location
  const getLocation = async () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('User location:', { latitude, longitude });
          resolve({ latitude, longitude });
        },
        (error) => {
          console.error('Failed to get location:', error);
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  };

  return useMutation(loginUser, {
    onSuccess: async (data) => {
      const { token, userID, fullName } = data;
      console.log('Login successful. Access Token:', token); // Log the access token

      dispatch(setAccessToken(token));
      dispatch(setUserID(userID));
      Alert.alert('Login Successful', `Welcome back, ${fullName || 'User'}!`);

      try {
        // Get FCM token and update notification token
        const fcmToken = await getFcmToken();
        if (fcmToken) {
          await updateNotificationToken(token, fcmToken);
        }

        // Get user location and update location on server
        const { latitude, longitude } = await getLocation();
        await updateLocation(token, latitude, longitude);

      } catch (error) {
        console.error('Failed to update FCM token or location:', error);
        Alert.alert('Error', 'Could not update FCM token or location.');
      }
    },
    onError: (error) => {
      console.log('Login error:', error);
      let errorMessage = error.message || 'An unexpected error occurred.';
      Alert.alert('Login Error', errorMessage);
    },
  });
};

export default useLogin;
