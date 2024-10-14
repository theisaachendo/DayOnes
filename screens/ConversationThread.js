import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios'; // Import Axios
import { BASEURL } from '../assets/constants'; // Import your base URL from constants

const ConversationThread = ({ route }) => {
  const { conversationId } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello there!', sender: 'John' },
    { id: '2', text: 'How are you?', sender: 'You' },
  ]);
  const [sending, setSending] = useState(false);

  // API call to send a message
  const sendMessageToAPI = async (messageText) => {
    try {
      setSending(true); // Set the state to show a loading indicator if needed

      // Log the payload to ensure it's correct
      console.log('Sending Payload:', {
        conversationId,
        message: messageText,
      });

      const response = await axios.post(`${BASEURL}/api/v1/message/send`, {
        conversationId,
        message: messageText,
      });

      if (response.status === 200) {
        console.log('Message sent successfully');
        return response.data;
      } else {
        console.error('Error sending message:', response.status);
      }
    } catch (error) {
      if (error.response) {
        console.error('Error sending message:', error.response.data);
      } else {
        console.error('Error sending message:', error.message);
      }
    } finally {
      setSending(false);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      // Simulate adding the message to the UI
      const newMessage = {
        id: (messages.length + 1).toString(),
        text: message,
        sender: 'You', // This would be replaced by the current user's data
      };
      
      // Optimistically update the UI first (add the message)
      setMessages([...messages, newMessage]);

      // Send the message to the API
      const apiResponse = await sendMessageToAPI(message);
      
      if (apiResponse) {
        console.log('API Response:', apiResponse);
      }

      // Clear the input field after sending the message
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Conversation Thread for ID: {conversationId}</Text>

      {/* Display existing messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.sender}>{item.sender}: </Text>
            <Text style={styles.message}>{item.text}</Text>
          </View>
        )}
      />

      {/* Message input and send button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#888"
          value={message}
          onChangeText={setMessage}
        />
        <Button title={sending ? 'Sending...' : 'Send'} onPress={handleSendMessage} disabled={sending} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c002b',
    padding: 10,
  },
  text: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  sender: {
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 5,
  },
  message: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
    color: '#fff',
  },
});

export default ConversationThread;
