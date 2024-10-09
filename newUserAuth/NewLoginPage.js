import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import useLogin from '../assets/hooks/useLogin';
import useFetchUser from '../assets/hooks/useFetchUser';
import useLogout from '../assets/hooks/useLogout';

const NewLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const accessToken = useSelector((state) => state.accessToken);
  const userID = useSelector((state) => state.userID);

  const { mutate: handleLogin, isLoading: loginLoading } = useLogin();
  const { mutate: handleFetchUser, isLoading: fetchUserLoading } = useFetchUser();
  const { mutate: handleLogout, isLoading: logoutLoading } = useLogout();

  const handlePrintCredentials = () => {
    Alert.alert('Stored Credentials', `UserID: ${userID}\nAccessToken: ${accessToken}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        {accessToken ? 'Logged In' : 'Logged Out'}
      </Text>

      <Text style={styles.header}>Login</Text>
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLogin({ email, password })}
        disabled={loginLoading}
      >
        <Text style={styles.buttonText}>{loginLoading ? 'Logging in...' : 'Login'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => handleFetchUser()}
        disabled={fetchUserLoading}
      >
        <Text style={styles.buttonText}>{fetchUserLoading ? 'Loading...' : 'Fetch User Info'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={() => handleLogout()}
        disabled={logoutLoading}
      >
        <Text style={styles.buttonText}>{logoutLoading ? 'Logging out...' : 'Logout'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.printButton]}
        onPress={handlePrintCredentials}
      >
        <Text style={styles.buttonText}>Print UserID & Token</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.signupButton]}
        onPress={() => navigation.navigate('NewSignupPage')}
      >
        <Text style={styles.buttonText}>Go to Signup</Text>
      </TouchableOpacity>

      {/* New button to navigate to create post page */}
      <TouchableOpacity
  style={[styles.button, styles.createPostButton]}
  onPress={() => navigation.navigate('CreatePostPage')} // Adjust with the actual route name for your create post page
>
  <Text style={styles.buttonText}>Go to Create Post</Text>
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
  status: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
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
  logoutButton: {
    backgroundColor: '#ff4444',
  },
  printButton: {
    backgroundColor: '#007bff',
  },
  signupButton: {
    backgroundColor: '#00aaff',
    marginTop: 20,
  },
  createPostButton: {
    backgroundColor: '#ff00ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NewLoginPage;
