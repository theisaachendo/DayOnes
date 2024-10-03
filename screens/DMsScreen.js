import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfilePictureButton from '../assets/components/ProfilePictureButton'; // Import the ProfilePictureButton

const DMsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Add Profile Picture Button in the top-left corner */}
      <ProfilePictureButton />

      <Text style={styles.text}>Direct Messages Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c002b', // Navy blue background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: '#fff',
  },
});

export default DMsScreen;
