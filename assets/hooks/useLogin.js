import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAccessToken, setUserID } from '../redux/actions';
import { Alert } from 'react-native';
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
      console.log('Token or userID not found in response');
      throw new Error('Access token or User ID not found');
    }
  } catch (error) {
    console.log('Error in loginUser:', error);

    if (!error.response) {
      console.log('No response from server - likely a network issue');
      throw new Error('Network error. Please check your internet connection.');
    }
    if (error.code === 'ECONNABORTED') {
      console.log('Request timed out');
      throw new Error('Request timed out. Please try again.');
    }
    throw error;
  }
};

const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation(loginUser, {
    onSuccess: (data) => {
      console.log('onSuccess called with data:', data);
      const { token, userID, fullName } = data;
      dispatch(setAccessToken(token));
      dispatch(setUserID(userID));
      Alert.alert('Login Successful', `Welcome back, ${fullName || 'User'}!`);
    },
    onError: (error) => {
      console.log('onError called with error:', error);
      let errorMessage = 'An unexpected error occurred.';

      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        if (typeof error.response.data.message === 'string') {
          errorMessage = error.response.data.message;
          console.log('String error message from response:', errorMessage);

          if (errorMessage.includes('User is not confirmed')) {
            errorMessage = 'Your email address is not verified. Please check your inbox for a verification email.';
            console.log('Customized error message for unconfirmed user');
          }

        } else if (Array.isArray(error.response.data.message)) {
          errorMessage = error.response.data.message.join(', ');
          console.log('Array error message from response:', errorMessage);
        } else if (typeof error.response.data.message === 'object') {
          errorMessage = JSON.stringify(error.response.data.message);
          console.log('Object error message from response:', errorMessage);
        }
      }

      if (typeof errorMessage !== 'string') {
        errorMessage = 'An unexpected error occurred.';
        console.log('Fallback error message used');
      }

      Alert.alert('Login Error', errorMessage);
    },
  });
};

export default useLogin;
