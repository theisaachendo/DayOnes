import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';

const ProfileScreen = () => {
  // Access the profile data from the Redux store
  const profile = useSelector((state) => state.profile.profile);

  return (
    <View style={styles.container}>
      {profile ? (
        <>
          <Image source={{ uri: profile.profilePicture }} style={styles.profileImage} />
          <Text style={styles.name}>{profile.fullName}</Text>
          <Text style={styles.username}>@{profile.username}</Text>
          <Text style={styles.email}>{profile.email}</Text>
          <Text style={styles.phone}>{profile.phone}</Text>
          <Text style={styles.role}>{profile.role}</Text>
        </>
      ) : (
        <Text style={styles.text}>No profile data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 5,
  },
  role: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: '#ccc',
  },
});

export default ProfileScreen;
