import axios from 'axios';
import { BASEURL } from './constants';

// Create a new conversation
export const createConversation = async (data) => {
  try {
    const response = await axios.post(`${BASEURL}/api/v1/conversation`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
};

// Get all conversations
export const getConversations = async (pageNo = 1, pageSize = 10) => {
  try {
    const response = await axios.get(`${BASEURL}/api/v1/conversation`, {
      params: { pageNo, pageSize },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

// Send a message
export const sendMessage = async (data) => {
  try {
    const response = await axios.post(`${BASEURL}/api/v1/message/send`, data);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Get all messages for a conversation
export const getMessages = async (conversationId, pageNo = 1, pageSize = 3) => {
  try {
    const response = await axios.get(`${BASEURL}/api/v1/message`, {
      params: { conversationId, pageNo, pageSize },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

// Disconnect
export const disconnect = async () => {
  try {
    const response = await axios.post(`${BASEURL}/api/v1/message/disconnect`);
    return response.data;
  } catch (error) {
    console.error('Error disconnecting:', error);
    throw error;
  }
};

// Delete a message
export const deleteMessage = async (messageId) => {
  try {
    const response = await axios.delete(`${BASEURL}/api/v1/message/${messageId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
};
