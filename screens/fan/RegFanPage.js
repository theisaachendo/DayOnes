import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const RegFanPage = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!fullName || !userName || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Validation Failed', 'Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation Failed', 'Password and confirm password do not match.');
      return;
    }

    const queryParams = new URLSearchParams({
      Username: userName,
      Password: password,
      FullName: fullName,
      Email: email,
      Phone: phone,
      Role: 'fan', // Specify 'fan' role
    }).toString();

    try {
      const response = await fetch(`https://pdgoqkofzbudgfnvypspz72kh40zttnv.lambda-url.us-east-1.on.aws/?${queryParams}`, {
        method: 'GET',
      });

      const result = await response.json();

      if (response.status === 201) {
        Alert.alert('Success', 'Registration successful');

        

        navigation.navigate('LoginPage');
      } else if (response.status === 200) {
        Alert.alert('Error', result);
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register as a Fan</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        placeholderTextColor="#888"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Choose a username"
        placeholderTextColor="#888"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        placeholderTextColor="#888"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        placeholderTextColor="#888"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginPage')}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>Already Have an Account?</Text>
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('LoginPage')}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000', // DefaultBlack equivalent
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'transparent',
    borderColor: '#4B0981',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
    color: '#fff',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#4B0981',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: '#4B0981',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default RegFanPage;
