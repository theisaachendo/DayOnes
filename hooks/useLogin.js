// hooks/useLogin.js
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const loginUser = async ({ username, password }) => {
  const response = await axios.get(
    `https://ifxz5tco3iasejg5ldo3udsq740cxxbl.lambda-url.us-east-1.on.aws/?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
  );
  return response.data;
};

const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export default useLogin;
