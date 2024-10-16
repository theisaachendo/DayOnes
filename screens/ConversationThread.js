import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import useSendMessage from '../assets/hooks/useSendMessage';
import { getMessages } from '../assets/services/apiService';
import socket from '../assets/services/socket';

const ConversationThread = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const route = useRoute();
  const { conversationId } = route.params;
  const accessToken = useSelector((state) => state.accessToken);
  const loggedInUser = useSelector((state) => state.user);
  const loggedInUserId = loggedInUser?.id || null;
  const { sendMessage, error } = useSendMessage(accessToken);

  useEffect(() => {
    fetchMessages();

    // Setup socket listeners
    socket.on('error', (err) => {
      console.error('Error failed:', err);
    });

    socket.on('connect', () => {
      console.info('Connected to WebSocket');
    });

    // Listen to incoming chat messages
    socket.on('chat-message', (composerText) => {
      console.log('Incoming message via WebSocket:', composerText);
      const remoteMessage = composerText.message;
      if (remoteMessage) {
        setMessages((previousMessages) => {
          const updatedMessages = [...previousMessages, remoteMessage];
          console.log('Updated messages after WebSocket:', updatedMessages);
          return updatedMessages;
        });
      }
    });

    // Clean up the socket listeners when component unmounts
    return () => {
      socket.off('chat-message');
      socket.off('error');
      socket.off('connect');
    };
  }, []);

  const fetchMessages = async () => {
    if (!accessToken) {
      console.error('User is not authenticated');
      return;
    }

    try {
      const data = await getMessages(conversationId, accessToken);
      console.log('Fetched messages:', data.data.messages);
      setMessages(data.data.messages);
    } catch (err) {
      console.error('Error fetching messages:', err.message);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      // Send the message via the API
      await sendMessage(conversationId, newMessage);

      // Emit the message via the WebSocket for real-time updates
      const messagePayload = {
        conversationId,
        message: newMessage,
        senderId: loggedInUserId,
      };

      socket.emit('chat-message', messagePayload); // Emit the message via WebSocket

      // Clear the input after sending
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderMessage = ({ item }) => {
    const isSender = item.sender_id === loggedInUserId;

    return (
      <View style={[styles.messageWrapper, isSender ? styles.senderWrapper : styles.receiverWrapper]}>
        <View style={[styles.messageBubble, isSender ? styles.senderBubble : styles.receiverBubble]}>
          <Text style={styles.messageText}>{item.message}</Text>
          <Text style={styles.messageTimestamp}>{item.created_at}</Text>
        </View>
      </View>
    );
  };

  // Only show the latest 100 messages
  const slicedMessages = messages.slice(-100);

  return (
    <View style={styles.container}>
      <FlatList
        data={[...slicedMessages].reverse()} // Reverse the messages here
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.messageList}
        extraData={messages}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={10}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Enter here"
          style={styles.input}
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>
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
  messageList: {
    flex: 1,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  senderWrapper: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  receiverWrapper: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
    maxWidth: '75%',
    position: 'relative',
  },
  senderBubble: {
    backgroundColor: '#4e9af1',
  },
  receiverBubble: {
    backgroundColor: '#1e1e1e',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  messageTimestamp: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#1e1e1e',
    borderRadius: 30,
  },
  input: {
    flex: 1,
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 30,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#4e9af1',
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ConversationThread;
