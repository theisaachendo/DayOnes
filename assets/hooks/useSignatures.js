import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASEURL } from '../constants';

export const useSignatures = () => {
  const [data, setData] = useState([]); // This will store only URLs
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const accessToken = useSelector(state => state.accessToken); // Get the access token from Redux

  console.log('useSignatures hook initialized'); // Log initialization

  const fetchSignatures = async () => {
    console.log('fetchSignatures called'); // Log when fetchSignatures is called

    setIsLoading(true);
    setIsError(false);

    try {
      console.log(`Making API request to ${BASEURL}/api/v1/signature/ with token: ${accessToken}`);

      const response = await axios.get(`${BASEURL}/api/v1/signature/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Set the access token in the headers
        },
      });

      console.log('API response received:', response); // Log the full response

      const signatures = response.data?.data || [];
      setData(signatures);
      console.log('Signatures data set in state:', signatures);
    } catch (error) {
      console.error('Error fetching signatures:', error); // Log the error if the request fails
      setIsError(true);
    } finally {
      setIsLoading(false);
      console.log('fetchSignatures completed. isLoading set to false');
    }
  };

  const deleteSignature = async (id) => {
    try {
      console.log(`Deleting signature with ID: ${id}`);
      await axios.delete(`${BASEURL}/api/v1/signature/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('Signature deleted successfully');
      fetchSignatures(); // Refresh signatures after deletion
    } catch (error) {
      console.error('Error deleting signature:', error);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (accessToken) {
      console.log(`useEffect triggered. Fetching signatures using access token.`);
      fetchSignatures();
    }
  }, [accessToken]); // Trigger fetch when accessToken changes

  return { data, isLoading, isError, refetch: fetchSignatures, deleteSignature };
};
