import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import ProfilePictureButton from '../assets/components/ProfilePictureButton';

// Mock data for conversations (use this temporarily)
const mockConversations = [
  { id: '1', title: 'Conversation with John Doe' },
  { id: '2', title: 'Conversation with Jane Smith' },
];

const DMsScreen = () => {
  const [conversations, setConversations] = useState([]);
  const navigation = useNavigation(); // Initialize the navigation hook

  useEffect(() => {
    // Simulate fetching conversations by hard-coding the data
    setConversations(mockConversations);
  }, []);

  const handleDisconnect = () => {
    console.log('Simulated disconnect');
  };

  const handleDeleteMessage = (messageId) => {
    console.log(`Simulated deletion of message with id ${messageId}`);
  };

  const openConversationThread = (conversationId) => {
    // Navigate to the conversation thread screen, passing the conversationId as a parameter
    navigation.navigate('ConversationThread', { conversationId });
  };

  return (
    <View style={styles.container}>
      <ProfilePictureButton />
      <Text style={styles.text}>Direct Messages Screen</Text>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.conversationItem}
            onPress={() => openConversationThread(item.id)} // Navigate on press
          >
            <Text style={styles.conversationText}>{item.title}</Text>
            <Button title="Delete" onPress={() => handleDeleteMessage(item.id)} />
          </TouchableOpacity>
        )}
      />

      <Button title="Disconnect" onPress={handleDisconnect} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c002b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: '#fff',
  },
  conversationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  conversationText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default DMsScreen;
