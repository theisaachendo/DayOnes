import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button } from 'react-native';
import { useSelector } from 'react-redux'; // Importing Redux's useSelector
import { useRoute } from '@react-navigation/native'; // To get conversationId from route params
import useSendMessage from '../assets/hooks/useSendMessage';
import { getMessages } from '../assets/services/apiService'; // Import the getMessages service

const ConversationThread = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const route = useRoute();
  const { conversationId } = route.params; // Get conversationId from the route
  const accessToken = useSelector((state) => state.accessToken); // Fetch the access token from Redux
  const { sendMessage, error } = useSendMessage(accessToken); // Pass accessToken to the hook

  useEffect(() => {
    // Fetch conversation messages when the component loads
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    if (!accessToken) {
      console.error('User is not authenticated');
      return;
    }

    try {
      const data = await getMessages(conversationId, accessToken);  // Pass accessToken to getMessages
      setMessages(data.data); // Assuming data.data contains the messages
    } catch (err) {
      console.error('Error fetching messages:', err.message);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') {
      return; // Don't send empty messages
    }

    await sendMessage(conversationId, newMessage);

    if (!error) {
      // After sending the message successfully, clear the input and fetch updated messages
      setNewMessage('');
      fetchMessages();
    }
  };

  const renderMessage = ({ item }) => {
    return (
      <View style={styles.messageItem}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversation Thread</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessage}
        style={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          style={styles.input}
          placeholderTextColor="#ccc"
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c002b',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  messageList: {
    flex: 1,
    marginBottom: 20,
  },
  messageItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  sender: {
    fontWeight: 'bold',
    color: '#fff',
  },
  messageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    paddingTop: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: '#fff',
  },
});

export default ConversationThread;
