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
  Dimensions,
  Platform,
  ImageBackground, // Import ImageBackground
} from 'react-native';
import { setUserProfile } from '../redux/actions';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import LogoText from '../components/LogoText';
import useLogin from '../hooks/useLogin';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Use the custom hook
  const { mutate: login, isLoading } = useLogin();

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Validation Error', 'Please enter both username and password.');
      return;
    }

    login(
      { username, password },
      {
        onSuccess: async (result) => {
          Alert.alert('Login Successful', `Welcome, ${result.profile.fullName || username}!`);

          // Dispatch the user profile data to Redux store
          dispatch(setUserProfile(result.profile));

          // Check permissions after successful login
          const hasAllPermissions = await checkPermissions();
          if (hasAllPermissions) {
            navigateToAppropriateStack(result.profile.role);
          } else {
            navigation.navigate('PermissionsScreen');
          }
        },
        onError: (error) => {
          if (error.response?.status === 401) {
            Alert.alert('Login Failed', 'Invalid username or password.');
          } else if (error.response?.status === 404) {
            Alert.alert('Login Failed', 'User not found.');
          } else {
            Alert.alert('Login Failed', 'An unexpected error occurred.');
          }
        }
      }
    );
  };

  const checkPermissions = async () => {
    try {
      const camera = await check(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA);
      const library = await check(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      const notifications = await check(Platform.OS === 'ios' ? PERMISSIONS.IOS.NOTIFICATIONS : PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

      return camera === RESULTS.GRANTED && library === RESULTS.GRANTED && notifications === RESULTS.GRANTED;
    } catch (error) {
      console.log('Error checking permissions:', error);
      return false;
    }
  };

  const navigateToAppropriateStack = (role) => {
    if (role === 'artist') {
      navigation.navigate('ArtistStack');
    } else if (role === 'fan') {
      navigation.navigate('FanStack');
    } else {
      Alert.alert('Login Error', 'Unrecognized user role.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background Image */}
      <ImageBackground
        source={require('../images/background.png')} // Replace with your image path
        style={styles.backgroundImage}
      >
        <View style={styles.contentContainer}>
          {/* Logo, positioned closer to the top */}
          <View style={styles.topSection}>
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
                editable={!isLoading}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
                editable={!isLoading}
              />
            </View>

            <LinearGradient colors={['#ff00ff', '#7000ff']} style={styles.loginButton}>
              <TouchableOpacity onPress={handleLogin} style={styles.fullWidth} disabled={isLoading}>
                <Text style={styles.buttonText}>{isLoading ? 'Logging in...' : 'Login'}</Text>
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

          <Text style={styles.signupText}>
            Didn’t signup yet?{' '}
            <Text onPress={() => navigation.navigate('RegFanPage')} style={styles.signupLink}>
              Signup Now
            </Text>
          </Text>

          <View style={styles.bottomSection}>
            <Text style={styles.artistQuestionText}>Are you an artist?</Text>
            <LinearGradient colors={['#ffcc00', '#ff8800']} style={styles.signupArtistButton}>
              <TouchableOpacity
                style={styles.fullWidth}
                onPress={() => navigation.navigate('RegArtistPage')}
              >
                <Text style={[styles.signupArtistText, { color: '#fff' }]}>Signup as an Artist</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
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
    resizeMode: 'cover', // or 'contain' depending on the image aspect ratio
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 30,
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
    elevation: 5,
    shadowColor: '#000',
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
    justifyContent: 'center',
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
    marginHorizontal: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  signupText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
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
    elevation: 5,
    shadowColor: '#000',
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
