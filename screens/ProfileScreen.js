import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

// Utility function to format phone numbers
const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return phoneNumber;
};

const ProfileScreen = () => {
  // Use useSelector to get the user profile and geolocation data from the Redux store
  const profile = useSelector(state => state.userProfile) || {
    profilePicture: null,
    fullName: 'Unknown User',
    username: 'unknown',
    email: 'unknown@example.com',
    phone: '000-000-0000',
    role: 'Unknown',
  };

  const geolocationData = useSelector(state => state.geolocationData) || {
    locale: 'Location Unknown',
  };

  // Capitalize the role
  const capitalizedRole = profile.role.charAt(0).toUpperCase() + profile.role.slice(1);

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={['#FF00FF', '#001F3F']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.profileImageContainer}>
        {profile.profilePicture ? (
          <Image source={{ uri: profile.profilePicture }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderImage} />
        )}
      </View>
      <Text style={styles.welcomeText}>
        Hello {profile.fullName}, welcome to your {capitalizedRole} account!
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Username: <Text style={styles.info}>{profile.username}</Text></Text>
        <Text style={styles.label}>Email: <Text style={styles.info}>{profile.email}</Text></Text>
        <Text style={styles.label}>Phone: <Text style={styles.info}>{formatPhoneNumber(profile.phone)}</Text></Text>
        <Text style={styles.label}>Location: <Text style={styles.info}>{geolocationData.locale}</Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    padding: 20,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  profileImageContainer: {
    width: 140,
    height: 140,
    marginTop: 40, // Adjust this value to raise the image
    marginBottom: 20,
    borderRadius: 70,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#00FFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#CCCCCC',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    color: '#CCCCCC',
  },
});

export default ProfileScreen;
