import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';

const fetchUserData = async (accessToken) => {
  const response = await axios.post('http://34.239.105.105:3000/api/v1/auth/me', {}, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Could not fetch user information');
  }
};

const useFetchUser = () => {
  const accessToken = useSelector((state) => state.accessToken);

  return useMutation(() => fetchUserData(accessToken), {
    onSuccess: (data) => {
      Alert.alert('User Info', `Fetched user information: ${JSON.stringify(data)}`);
    },
    onError: (error) => {
      let errorMessage = 'An unexpected error occurred.';

      if (error.response?.data?.message) {
        errorMessage = error.response?.data?.message;
      }

      Alert.alert('Fetch Error', errorMessage);
    },
  });
};

export default useFetchUser;
