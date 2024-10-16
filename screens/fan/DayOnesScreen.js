import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchInvites } from '../assets/services/apiService'; // Your regular invite fetching API

const DayOnesScreen = () => {
  const [invites, setInvites] = useState([]);
  const accessToken = useSelector((state) => state.accessToken);
  const navigation = useNavigation();

  useEffect(() => {
    fetchInvitesFromAPI();
  }, []);

  const fetchInvitesFromAPI = async () => {
    if (!accessToken) {
      Alert.alert('Error', 'User is not authenticated');
      return;
    }

    try {
      const response = await fetchInvites(accessToken); // Regular invite fetching API
      const { data } = response;

      if (data && data.length > 0) {
        setInvites(data); // Store the invites
        console.log('Invites fetched successfully:', data);
      } else {
        setInvites([]);
        console.log('No invites found.');
      }
    } catch (err) {
      console.error('Error fetching invites:', err.message);
      Alert.alert('Error', 'Failed to fetch invites.');
      setInvites([]);
    }
  };

  const handleInvitePress = (inviteId) => {
    // Navigate to a detailed view or perform any action based on the invite
    navigation.navigate('ConversationThread', { inviteId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleInvitePress(item.id)}>
      <View style={styles.item}>
        {/* Profile Picture Placeholder */}
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }} // Placeholder for profile picture
          style={styles.profilePicture}
        />
        <Text style={styles.itemText}>
          Artist {item.artist_post_id} has sent you a new message
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Day Ones</Text>
      <FlatList
        data={invites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
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
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  itemText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default DayOnesScreen;
