import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const RegArtistPage = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');

  const handleRegister = async () => {
    if (!fullName || !userName || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Validation Failed', 'Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation Failed', 'Password and confirm password do not match.');
      return;
    }

    // Call your API to register the user
    const success = await registerArtist({ fullName, userName, email, phone, password, instagramHandle });

    if (success) {
      Alert.alert('Success', 'Registration successful');
      navigation.navigate('LoginPage');
    } else {
      Alert.alert('Error', 'Registration failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Artist Registration</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Full Name" 
        value={fullName} 
        onChangeText={setFullName} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Username" 
        value={userName} 
        onChangeText={setUserName} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Phone" 
        value={phone} 
        onChangeText={setPhone} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        value={password} 
        secureTextEntry 
        onChangeText={setPassword} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Confirm Password" 
        value={confirmPassword} 
        secureTextEntry 
        onChangeText={setConfirmPassword} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Instagram Handle (optional)" 
        value={instagramHandle} 
        onChangeText={setInstagramHandle} 
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#4B0981',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: '#000',
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
});

export default RegArtistPage;
