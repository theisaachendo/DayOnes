import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken, setUserID } from '../redux/actions';
import { Alert } from 'react-native';

const logoutUser = async (accessToken) => {
  const response = await axios.post('http://34.239.105.105:3000/api/v1/auth/signout', {}, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 200) {
    return true;
  } else {
    throw new Error('Could not log out');
  }
};

const useLogout = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken);

  return useMutation(() => logoutUser(accessToken), {
    onSuccess: () => {
      dispatch(setAccessToken('')); // Clear the token in Redux
      dispatch(setUserID('')); // Clear the userID in Redux
      Alert.alert('Logout Successful', 'You have been logged out.');
    },
    onError: (error) => {
      let errorMessage = 'An unexpected error occurred.';

      if (error.response?.data?.message) {
        errorMessage = error.response?.data?.message;
      }

      Alert.alert('Logout Error', errorMessage);
    },
  });
};

export default useLogout;
