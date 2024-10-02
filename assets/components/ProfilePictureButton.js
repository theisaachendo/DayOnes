import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const ProfilePictureButton = () => {
  const navigation = useNavigation();

  const profile = useSelector(state => state.userProfile) || {
    profilePicture: null,
    fullName: 'First Last',
    email: 'FirstLast@gmail.com',
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
        <Image
          source={profile.profilePicture ? { uri: profile.profilePicture } : require('../images/defaultProfileImage.png')}
          style={styles.profilePicture}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Position absolutely
    top: 20, // Position near the top of the screen
    left: 20, // Position near the left of the screen
    zIndex: 1, // Ensure it stays on top
  },
  profilePicture: {
    width: 40, // Small profile picture size
    height: 40,
    borderRadius: 20, // Make it circular
    borderWidth: 2,
    borderColor: '#FFD700', // Gold border
  },
});

export default ProfilePictureButton;
