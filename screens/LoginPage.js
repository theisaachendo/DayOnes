// Updated LoginScreen.js

import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Validation Error', 'Please enter both username and password.');
      return;
    }

    try {
      const response = await fetch(`https://ifxz5tco3iasejg5ldo3udsq740cxxbl.lambda-url.us-east-1.on.aws/?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
        method: 'GET',
      });

      const result = await response.json();

      if (response.status === 200) {
        Alert.alert('Login Successful', `Welcome, ${result.profile.fullName || username}!`);
        navigation.navigate('HomePage', { profile: result.profile });
        // Navigate to the appropriate stack based on the user's role
        if (result.profile.role === 'artist') {
          navigation.navigate('ArtistStack');
        } else if (result.profile.role === 'fan') {
          navigation.navigate('FanStack');
        } else {
          Alert.alert('Login Error', 'Unrecognized user role.');
        }
      } else if (response.status === 401) {
        Alert.alert('Login Failed', 'Invalid username or password.');
      } else if (response.status === 404) {
        Alert.alert('Login Failed', 'User not found.');
      } else {
        Alert.alert('Login Failed', 'An unexpected error occurred.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', 'An unexpected error occurred.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>DayOnes</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('RegisterOptionPage')}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Test Page Button */}
      <TouchableOpacity style={styles.testPageButton} onPress={() => navigation.navigate('GeolocationPage')}>
        <Text style={styles.testPageButtonText}>Go to Geolocation Page</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000', // Black background for consistency
  },
  logoContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff', // White logo text for contrast
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#4B0981',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    color: '#fff', // White text color for inputs
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#4B0981',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  signUpButton: {
    marginTop: 30,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#4B0981',
    fontSize: 18,
  },
  testPageButton: {
    marginTop: 30,
    alignItems: 'center',
  },
  testPageButtonText: {
    color: '#4B0981',
    fontSize: 18,
  },
});

export default LoginScreen;
