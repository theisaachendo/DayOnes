import axios from 'axios';
import { BASEURL } from './constants';

// Fetch all conversations with pagination
export const getConversations = async (accessToken, pageNo = 1, pageSize = 10) => {
  console.log('asdasdasd',{getConversations})
  try {
    const response = await axios.get(`${BASEURL}/api/v1/conversation`, {
      
      params: {
        pageNo,  // Pass the page number
        pageSize // Pass the page size
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,  // Pass Bearer token dynamically
      },
      
    });

    console.log('Conversations fetched:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // If no conversations found, return an empty array
      if (error.response.status === 404) {
        console.warn('No conversations found, returning empty array.');
        return { conversations: [], meta: { count: 0, page: pageNo, size: pageSize, pages: 0 } };
      } 
      
      // Handle Unauthorized (401) error
      if (error.response.status === 401) {
        console.error('Unauthorized request, check access token.');
        throw new Error('Unauthorized access. Please check your credentials.');
      }

      // Handle any other specific status codes
      console.error(`Error fetching conversations: ${error.response.status}`);
    } else {
      console.error('Network error or server is unreachable:', error.message);
    }

    throw error;  // Re-throw the error for further handling if necessary
  }
};

// Disconnect the WebSocket
export const disconnect = async (accessToken) => {
  try {
    const response = await axios.post(`${BASEURL}/api/v1/message/disconnect`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Pass Bearer token dynamically
      },
    });

    console.log('Disconnected:', response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized request, check access token.');
      throw new Error('Unauthorized access. Please check your credentials.');
    }

    console.error('Error disconnecting:', error);
    throw error;
  }
};
