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
  Image,
  Dimensions,
  ImageBackground, // Import ImageBackground for the background
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LogoText from '../../assets/components/LogoText'; // Import the LogoText component

const { width, height } = Dimensions.get('window');

const RegArtistPage = () => {
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
      Role: 'artist',
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background Image */}
      <ImageBackground
        source={require('../../images/background.png')} // Set your background image here
        style={styles.backgroundImage}
      >
        <View style={styles.contentContainer}>
          <View style={styles.topSection}>
            <LogoText />
            <Image
              source={require('../../images/DayOnesLogo.png')}
              style={styles.avatar}
              resizeMode="contain"
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Icon name="user" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#888"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Icon name="user-circle" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#888"
                value={userName}
                onChangeText={setUserName}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Icon name="envelope" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Icon name="phone" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Phone number"
                placeholderTextColor="#888"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.connectButton}>
            <Text style={styles.connectButtonText}>+ Connect Verified Account</Text>
          </TouchableOpacity>

          <LinearGradient colors={['#ff00ff', '#7000ff']} style={styles.signupButton}>
            <TouchableOpacity onPress={handleRegister} style={styles.fullWidth}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
          </LinearGradient>

          <Text style={styles.loginText}>
            Already Have an Account?{' '}
            <Text onPress={() => navigation.navigate('LoginPage')} style={styles.loginLink}>
              Login
            </Text>
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    marginTop: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderColor: '#4B0981',
    borderWidth: 1,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    height: 50,
  },
  connectButton: {
    backgroundColor: 'transparent',
    borderColor: '#00ccff',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#00ccff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  fullWidth: {
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  loginLink: {
    color: '#00ccff',
    textDecorationLine: 'underline',
  },
});

export default RegArtistPage;
