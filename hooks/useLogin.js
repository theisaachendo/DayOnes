import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAccessToken, setUserID } from '../redux/actions';
import { Alert } from 'react-native';

const loginUser = async ({ email, password }) => {
  const response = await axios.post('http://34.239.105.105:3000/api/v1/auth/signin', {
    username: email,
    password,
  });

  // Extract the token, userID, and full_name from the nested structure
  const token = response.data?.data?.access_token;
  const userID = response.data?.data?.user?.id;
  const fullName = response.data?.data?.user?.full_name;

  if (typeof token === 'string' && typeof userID === 'string') {
    return { token, userID, fullName };
  } else {
    throw new Error('Access token or User ID not found');
  }
};

const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation(loginUser, {
    onSuccess: (data) => {
      const { token, userID, fullName } = data;
      dispatch(setAccessToken(token)); // Store the token in Redux
      dispatch(setUserID(userID)); // Store the userID in Redux
      Alert.alert('Login Successful', `Welcome back, ${fullName || 'User'}!`);
    },
    onError: (error) => {
      let errorMessage = 'An unexpected error occurred.';

      if (error.response?.data?.message) {
        if (typeof error.response.data.message === 'string') {
          errorMessage = error.response.data.message;

          // Check for specific error messages and customize the alert
          if (errorMessage.includes('User is not confirmed')) {
            errorMessage = 'Your email address is not verified. Please check your inbox for a verification email.';
          }

        } else if (Array.isArray(error.response.data.message)) {
          errorMessage = error.response.data.message.join(', ');
        } else if (typeof error.response.data.message === 'object') {
          errorMessage = JSON.stringify(error.response.data.message);
        }
      }

      if (typeof errorMessage !== 'string') {
        errorMessage = 'An unexpected error occurred.';
      }

      Alert.alert('Login Error', errorMessage);
    },
  });
};

export default useLogin;
