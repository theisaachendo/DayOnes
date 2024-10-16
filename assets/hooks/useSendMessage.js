import { useState } from 'react';
import axios from 'axios';
import socket from '../services/socket'; // Import the WebSocket connection
import { Alert } from 'react-native';

const useSendMessage = (accessToken) => {
  const [error, setError] = useState(null);

  // Send Message Function
  const sendMessage = async (conversationId, message) => {
    if (!accessToken) {
      Alert.alert('Error', 'User is not authenticated');
      return;
    }

    const baseUrl = 'http://44.202.63.106:3000'; // WebSocket base URL

    try {
      // Define message payload
      const payload = {
        conversationId: conversationId,
        message: message,
      };

      // Send message using axios (API call)
      const response = await axios({
        method: 'POST',
        url: `${baseUrl}/api/v1/message/send`,
        data: payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      // Handle successful response
      console.log('Message sent successfully via API:', response.data);

      // Emit the message via WebSocket for real-time updates
      console.log('Emitting message via WebSocket:', payload);
      socket.emit('chat-message', payload); // Emit message via WebSocket

      return response.data;

    } catch (err) {
      // Handle errors
      console.error('Error sending message:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data : err.message);
      Alert.alert('Error', 'Failed to send the message');
    }
  };

  return { sendMessage, error };
};

export default useSendMessage;
