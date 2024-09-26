import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Correct import for navigation
import { useSignup } from '../hooks/useSignup'; // Update with the actual path to your hook

const NewSignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('ARTIST');

  const navigation = useNavigation(); // Correctly get the navigation object
  const signupMutation = useSignup();

  const handleSignup = () => {
    if (!email || !password || !confirmPassword || !name || !phoneNumber) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }

    signupMutation.mutate({ email, password, name, phoneNumber, role });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        value={confirmPassword}
        secureTextEntry
        onChangeText={setConfirmPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#888"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>

      {/* Navigation Buttons */}
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('NewLoginPage')}
      >
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('VerifyAccount', { email })}
      >
        <Text style={styles.buttonText}>Go to Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#fff',
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#ff8800',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  secondaryButton: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NewSignupPage;
