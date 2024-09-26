import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const signupUser = async ({ email, password, name, phoneNumber, role }) => {
  try {
    const response = await axios.post('http://34.239.105.105:3000/api/v1/auth/signup', {
      email,
      password,
      role,
      name,
      phone_number: phoneNumber,
    });

    // Check if the user was created successfully
    if (response.status === 200 && response.data?.success) {
      return response.data;
    } else {
      // If the status is not 200 or there's no success flag in the response, throw an error
      throw new Error('User creation failed. Please try again.');
    }
  } catch (error) {
    if (error.response?.status === 500) {
      // If it's an Internal Server Error but the account is created, consider it a success
      if (error.response?.data?.message?.includes('User created')) {
        return { success: true };
      }
    }
    // If there's an error with the request itself, throw it to be handled by onError
    throw error.response?.data?.message || 'An unexpected error occurred during signup.';
  }
};

export const useSignup = () => {
  const navigation = useNavigation();

  return useMutation(signupUser, {
    onSuccess: (data, variables) => {
      Alert.alert('Signup Successful', 'Please check your email for the verification code.');
      navigation.navigate('VerifyAccount', { email: variables.email });
    },
    onError: (error) => {
      let errorMessage = 'An unexpected error occurred.';
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error.response?.status === 500) {
        errorMessage = 'There was a server issue, but your account may still have been created. Please check your email for a verification code or try logging in.';
      }
      Alert.alert('Signup Error', errorMessage);
    },
  });
};
