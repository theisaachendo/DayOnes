// DMsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { getConversations } from '../assets/services/apiService';

const DMsScreen = () => {
  const [conversations, setConversations] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const accessToken = useSelector((state) => state.accessToken); // Fetch accessToken from Redux store

  useEffect(() => {
    fetchConversations();
  }, [pageNo]);

  const fetchConversations = async () => {
    if (!accessToken) {
      Alert.alert('Error', 'User is not authenticated');
      console.error('Error: Missing access token.');
      return;
    }

    try {
      console.log('Fetching conversations with access token:', accessToken);
      const data = await getConversations(accessToken, pageNo, pageSize); // Pass pageNo and pageSize

      if (data.conversations && data.conversations.length > 0) {
        setConversations(data.conversations); // Set conversations if found
        console.log('Conversations fetched successfully:', data.conversations);
      } else {
        setConversations([]); // Set to empty if no conversations
        console.log('No conversations found.');
      }
    } catch (err) {
      console.error('Error fetching conversations:', err.message);
      Alert.alert('Error', 'Failed to fetch conversations.');
      setConversations([]); // In case of error, set to empty array
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Direct Messages</Text>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.itemText}>
            {item.sender.full_name} - Last message: {item.last_message || 'No messages yet'}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c002b',
    padding: 20,
  },
  text: {
    fontSize: 24,
    color: '#fff',
  },
  itemText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default DMsScreen;
