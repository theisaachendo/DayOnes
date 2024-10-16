import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute, useFocusEffect } from '@react-navigation/native';
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

  // Re-fetch messages every time the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      // Fetch messages every time the user navigates to this screen
      fetchMessages();

      // Re-establish WebSocket connection every time the screen is focused
      socket.emit('join-conversation', conversationId);

      // Clean up the WebSocket connection when leaving the screen
      return () => {
        socket.off('chat-message');
        socket.emit('leave-conversation', conversationId);
      };
    }, [conversationId])
  );

  // Fetch messages from the server
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

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      await sendMessage(conversationId, newMessage);

      const messagePayload = {
        conversationId,
        message: newMessage,
        senderId: loggedInUserId,
      };

      socket.emit('chat-message', messagePayload); // Emit the message via WebSocket

      // Optimistically add the message to the UI immediately
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          message: newMessage,
          sender_id: loggedInUserId,
          created_at: new Date().toISOString(),
        },
      ]);

      setNewMessage(''); // Clear the input
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Listen for incoming messages via WebSocket
  useEffect(() => {
    socket.on('chat-message', (messageData) => {
      const remoteMessage = messageData.message;
      if (remoteMessage) {
        setMessages((previousMessages) => [...previousMessages, remoteMessage]);
      }
    });

    return () => {
      socket.off('chat-message'); // Clean up when unmounting
    };
  }, []);

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

  return (
    <View style={styles.container}>
      <FlatList
        data={messages.reverse()} // Reverse the order of messages so newest ones show at the bottom
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.messageList}
        extraData={messages}
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
