import React from 'react';
import { View, Text, StyleSheet, Image, Alert, TextInput, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing Icon for Home button
import LogoText from '../assets/components/LogoText'; // Import the reusable LogoText component
import { BASEURL } from '../assets/constants';
import axios from 'axios';
import useFetchUser from '../assets/hooks/useFetchUser';

const { height } = Dimensions.get('window'); // Get screen height to ensure everything fits

const ProfileScreen = ({ navigation }) => {
  const accessToken = useSelector(state => state.accessToken);
  const profile = useSelector(state => state.userProfile) || {
    profilePicture: null,
    fullName: 'First Last',
    email: 'FirstLast@gmail.com',
    role: 'fan', // Assuming role defaults to 'fan' if not set
  };

  const navigateToHomePage = () => {
    // Check the role and navigate to the appropriate home page
    if (profile.data.role === 'ARTIST') {
      navigation.navigate('HHomePage');
    } else if (profile.data.role === 'FAN') {
      navigation.navigate('FanStack');
    } else {
      // Fallback in case role is missing or unexpected
      Alert.alert('Error', 'Unrecognized user role.');
    }
  };

  const { mutate: fetchUser } = useFetchUser(); // Destructure mutate function for fetchUser

  const handleUpdateUser = async () => {
    const url = `${BASEURL}/api/v1/user/update-user`;
    const data = {
      avatarUrl: 'https://picsum.photos/seed/picsum/200/300',
      fullName: profile.data.full_name,
      role: profile.data.role,
      phoneNumber: profile.data.phoneNumber,
    };

    try {
      const response = await axios.post(url, new URLSearchParams(data).toString(), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      Alert.alert('Success', 'User information updated successfully.');
      console.log('Response data:', response.data);

      // Call fetchUser to refresh profile data in the store
      fetchUser();

    } catch (error) {
      console.error('Error updating user info:', error);
      Alert.alert('Error', 'Failed to update user information.');
    }
  };

  return (
    <>
      {/* Set the status bar background color and content */}
      <StatusBar backgroundColor="#0c002b" barStyle="light-content" />

      <View style={styles.container}>

        {/* Home button in the top left-hand corner */}
        <TouchableOpacity style={styles.homeButton} onPress={navigateToHomePage}>
          <Icon name="home" size={24} color="#FFF" />
        </TouchableOpacity>

        {/* Center the LogoText and add space from the top and below */}
        <View style={styles.logoContainer}>
          <LogoText />
        </View>

        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>Profile</Text>

          {/* Profile Picture */}
          <Image
            source={profile.data.avatar_url ? { uri: profile.data.avatar_url } : require('../assets/images/defaultProfileImage.png')}
            style={styles.profilePicture}
          />
    <TouchableOpacity style={styles.button} onPress={handleUpdateUser}>
      <Text style={styles.buttonText}>Change Picture</Text>
    </TouchableOpacity>

          {/* Name Input */}
          <TextInput
            style={styles.input}
            value={profile.data.full_name}
            placeholder="Name"
            placeholderTextColor="#FFF"
            editable={false} // Just display the name for now
          />

          {/* Email Input */}
          <TextInput
            style={styles.input}
            value={profile.data.email}
            placeholder="youremail@gmail.com"
            placeholderTextColor="#FFF"
            editable={false} // Just display the email for now
          />

          {/* Line between sections */}
          <View style={styles.line} />

          {/* Connected Accounts */}
          <View style={styles.connectedAccounts}>
            <Text style={styles.connectedAccountsTitle}>Connected Accounts</Text>
            <View style={styles.socialIcons}>
              <Image source={require('../assets/images/Instagram_logo.png')} style={styles.iconLeft} />
              <Image source={require('../assets/images/Facebook_logo.png')} style={styles.iconLeft} />
              <Image source={require('../assets/images/X_logo.jpg')} style={styles.iconLeft} />
            </View>
            <TouchableOpacity style={[styles.button, styles.connectButton]}>
              <Text style={styles.buttonText}>+ Connect More</Text>
            </TouchableOpacity>
          </View>

          {/* Line above signature button */}
          <View style={styles.line} />

          {/* Signature & Text Settings */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignaturePage')} // Navigate to the signatures page
          >
            <Text style={styles.buttonText}>Manage Signatures/Texts</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c002b', // Navy blue background
    justifyContent: 'center',
    padding: 20,
    height: height, // Ensure it fits the screen without scrolling
  },
  homeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    backgroundColor: 'transparent', // Transparent background to avoid button being blocked
  },
  logoContainer: {
    alignItems: 'center', // Center the logo horizontally
    marginTop: 30, // Add spacing from the top
    marginBottom: 20, // Add spacing between the logo and the next section
  },
  profileSection: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center', // Center elements horizontally
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#333',
    color: '#FFF',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '100%',
    textAlign: 'center', // Center the text
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#888',
    marginVertical: 10,
  },
  connectedAccounts: {
    marginVertical: 20,
    width: '100%',
  },
  connectedAccountsTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left', // Align to the left side
    alignSelf: 'flex-start',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align icons to the left
    marginBottom: 10,
    width: '100%',
  },
  iconLeft: {
    width: 40,
    height: 40,
    marginRight: 15, // Space between icons
  },
  button: {
    backgroundColor: '#FFD700', // Gold color for the buttons
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
    width: '100%',
  },
  connectButton: {
    marginTop: 15, // Add some margin to separate from icons
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
