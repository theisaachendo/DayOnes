import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { BASEURL } from '../constants';
import { setUserProfile } from '../redux/actions'; // Adjust the import path

const fetchUserData = async (accessToken) => {
  const response = await axios.post(`${BASEURL}/api/v1/auth/me`, {}, {
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
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken);

  return useMutation(() => fetchUserData(accessToken), {
    onSuccess: (data) => {
      dispatch(setUserProfile(data)); // Store data in Redux store

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
