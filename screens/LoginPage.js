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
  Dimensions
} from 'react-native';
import { setUserProfile } from '../redux/actions'; // Make sure this points to your correct actions file
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

// Import the LogoText component you created
import LogoText from '../components/LogoText'; // Adjust the path if necessary

const { width, height } = Dimensions.get('window'); // Get device dimensions

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Use dispatch to send actions to Redux

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

        // Dispatch the user profile data to Redux store
        dispatch(setUserProfile(result.profile));

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

      {/* Background Gradient */}
      <LinearGradient
        colors={['#0c002b', '#1b0248']} // Adjusted gradient to match the first image's background
        style={styles.gradientBackground}
      />

      <View style={styles.contentContainer}>
        {/* Logo, positioned closer to the top */}
        <View style={styles.topSection}>
          {/* Use the imported LogoText component here */}
          <LogoText />
        </View>

        {/* Input Fields and Login Button */}
        <View style={styles.middleSection}>
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

          {/* Login Button */}
          <LinearGradient colors={['#ff00ff', '#7000ff']} style={styles.loginButton}>
            <TouchableOpacity onPress={handleLogin} style={styles.fullWidth}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Google and Apple Buttons */}
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="google" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Icon name="apple" size={28} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Sign Up Links */}
        <Text style={styles.signupText}>
          Didn’t signup yet?{' '}
          <Text onPress={() => navigation.navigate('RegFanPage')} style={styles.signupLink}>
            Signup Now
          </Text>
        </Text>

        {/* Are you an artist? Section, positioned closer to the bottom */}
        <View style={styles.bottomSection}>
          <Text style={styles.artistQuestionText}>Are you an artist?</Text>
          <LinearGradient colors={['#ffcc00', '#ff8800']} style={styles.signupArtistButton}>
            <TouchableOpacity
              style={styles.fullWidth}
              onPress={() => navigation.navigate('RegArtistPage')} // Navigate to the desired page
            >
              <Text style={[styles.signupArtistText, { color: '#fff' }]}>Signup as an Artist</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
  },
  gradientBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between', // Distribute top, middle, and bottom sections
    paddingHorizontal: 20,
    paddingVertical: 40, // Adds padding to bring content away from the edges
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 30, // Added margin to space it out from the middle section
  },
  middleSection: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
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
  fullWidth: {
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the icons horizontally
    alignItems: 'center',
    marginBottom: 30,
  },
  iconButton: {
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15, // Add space between the two icons
    elevation: 5, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  signupText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20, // Add some margin above the bottom section
  },
  signupLink: {
    color: '#00ccff',
    textDecorationLine: 'underline',
  },
  bottomSection: {
    alignItems: 'center',
  },
  artistQuestionText: {
    color: '#888',
    fontSize: 16,
    marginBottom: 10,
  },
  signupArtistButton: {
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    elevation: 5, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  signupArtistText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
