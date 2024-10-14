import { useState } from 'react';
import axios from 'axios';
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
        conversationId: conversationId, // Pass the conversationId dynamically
        message: message,
      };

      // Send message using axios
      const response = await axios({
        method: 'POST',
        url: `${baseUrl}/api/v1/message/send`, // The message send endpoint
        data: payload, // Payload including conversationId and message
        headers: {
          Authorization: `Bearer ${accessToken}`, // Send the access token in the headers
          'Content-Type': 'application/json',
        },
      });

      // Handle successful response
      console.log('Message sent successfully:', response.data);
      return response.data; // You can return the response if you need to

    } catch (err) {
      // Handle errors (e.g., invalid conversationId, network issues)
      console.error('Error sending message:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data : err.message);
      Alert.alert('Error', 'Failed to send the message');
    }
  };

  return { sendMessage, error };
};

export default useSendMessage;
