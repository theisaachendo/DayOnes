import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchSignatures = async (username) => {
  const response = await axios.get('https://x4d3fe2tppuqjgz5zysgqi4sre0lpmmx.lambda-url.us-east-1.on.aws/', {
    params: {
      artistUsername: username,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 200) {
    return response.data.data;
  } else {
    throw new Error('Failed to fetch signatures');
  }
};

export const useSignatures = (username) => {
  return useQuery(['signatures', username], () => fetchSignatures(username), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    onError: (error) => {
      console.error('Error fetching signatures:', error);
    },
  });
};
