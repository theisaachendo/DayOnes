import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { BASEURL } from '../assets/constants';
import LogoText from '../assets/components/LogoText';

const { height } = Dimensions.get('window');

const ProfileScreen = () => {
  const accessToken = useSelector(state => state.accessToken);
  const profile = useSelector(state => state.userProfile) || {
    profilePicture: null,
    fullName: 'First Last',
    email: 'FirstLast@gmail.com',
    role: 'fan',
  };

  const navigation = useNavigation();

  const handleLogout = async () => {
    const url = `${BASEURL}/api/v1/auth/signout`;

    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('Logged Out', 'You have been logged out successfully.');
        navigation.navigate('LoginPage');
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data &&
        error.response.data.message === "Access Token has been revoked"
      ) {
        console.warn('Access token was already revoked. Navigating to login.');
        navigation.navigate('LoginPage');
      } else {
        console.error('Error logging out:', error);
        Alert.alert('Error', 'Failed to log out. Please try again.');
      }
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#0c002b" barStyle="light-content" />
      <View style={styles.container}>
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={24} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <LogoText />
        </View>

        <View style={styles.profileSection}>
  <Text style={styles.sectionTitle}>Profile</Text>

  <Image
    source={profile.data?.avatar_url ? { uri: profile.data.avatar_url } : require('../assets/images/defaultProfileImage.png')}
    style={styles.profilePicture}
  />

  <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Change Picture')}>
    <Text style={styles.buttonText}>Change Picture</Text>
  </TouchableOpacity>

  <TextInput
    style={styles.input}
    value={profile.data?.full_name || 'Name'}
    placeholder="Name"
    placeholderTextColor="#FFF"
    editable={false}
  />

  <TextInput
    style={styles.input}
    value={profile.data?.email || 'youremail@gmail.com'}
    placeholder="youremail@gmail.com"
    placeholderTextColor="#FFF"
    editable={false}
  />

  {/* Line above Manage Signatures/Texts button */}
  <View style={[styles.line, { marginBottom: 15 }]} />

  {/* Manage Signatures/Texts button for artists only */}
  {profile.data?.role === 'ARTIST' && (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignaturePage')}>
      <Text style={styles.buttonText}>Manage Signatures/Texts</Text>
    </TouchableOpacity>
  )}

  {/* Logout button */}
  <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
    <Text style={styles.logoutButtonText}>Logout</Text>
  </TouchableOpacity>
</View>


      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c002b',
    justifyContent: 'center',
    padding: 20,
    height: height,
  },
  homeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  profileSection: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
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
  },
  input: {
    backgroundColor: '#333',
    color: '#FFF',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '100%',
    textAlign: 'center',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#888',
    marginVertical: 10,
    marginBottom: 15, // Adjusts space below the line
  },

  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
    width: '100%',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF0000', // Red color for logout
    paddingVertical: 10
  },
  logoutButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
