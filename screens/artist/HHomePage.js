import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert, Image, PermissionsAndroid, Platform, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import LinearGradient from 'react-native-linear-gradient';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import ProfileScreen from '../ProfileScreen';
import NotificationsScreen from '../NotificationsScreen';
import DMsScreen from '../DMsScreen';
import ArtistPostsPage from './ArtistPostsPage';
import EditScreen from './EditScreen'; // Import the EditScreen component

const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const HHomePage = ({ navigation, route }) => {
  const [sliderValue, setSliderValue] = useState([100]);
  const [selectedImage, setSelectedImage] = useState(null);

  const userProfile = useSelector(state => state.userProfile) || {
    username: 'unknown',
    fullName: 'Unknown User',
  };

  useEffect(() => {
    console.log("UserProfile from Redux:", userProfile);

    // Check if an edited image is passed from EditScreen
    if (route.params?.editedImage) {
      setSelectedImage(route.params.editedImage);
    }
  }, [userProfile, route.params]);

  const options = {
    mediaType: 'photo',
    includeBase64: true,
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission to take pictures',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          takePicture();
        } else {
          Alert.alert('Permission Denied', 'Camera permission is required to take pictures.');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      takePicture();
    }
  };

  const requestExternalStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs permission to access your files',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          uploadFile();
        } else {
          Alert.alert('Permission Denied', 'Storage permission is required to upload files.');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      uploadFile();
    }
  };

  const takePicture = () => {
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  const uploadFile = () => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  const feetToMeters = (feet) => {
    return Math.round(feet * 0.3048);
  };

  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Profile':
              iconName = 'user';
              break;
            case 'Posts':
              iconName = 'file-text-o';
              break;
            case 'Notifications':
              iconName = 'bell-o';
              break;
            case 'DMs':
              iconName = 'envelope-o';
              break;
            default:
              iconName = 'home';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF0080',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Main" options={{ tabBarLabel: 'Home' }}>
        {() => (
          <ImageBackground
            source={require('../../images/background.png')}
            style={styles.backgroundImage}
          >
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.title}>Autographs & Invites</Text>
              </View>

            <LinearGradient
              colors={['#FF00FF', '#001F3F']}
              style={styles.imageContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage.uri }}
                  style={styles.selectedImage}
                />
              ) : (
                <Text style={styles.imageText}>Talk to your fans</Text>
              )}
            </LinearGradient>

              <View style={styles.pictureContainer}>
                <TouchableOpacity style={styles.pictureButton} onPress={requestCameraPermission}>
                  <Icon name="camera" size={30} color="#00FFFF" style={styles.icon} />
                  <Text style={styles.buttonText}>Take Picture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.pictureButton} onPress={requestExternalStoragePermission}>
                  <Icon name="file" size={30} color="#00FFFF" style={styles.icon} />
                  <Text style={styles.buttonText}>Upload File</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.sliderContainer}>
                <Text style={styles.sliderLabel}>Range</Text>

                <Text style={styles.sliderValue}>
                  {sliderValue[0]} feet ({feetToMeters(sliderValue[0])} meters)
                </Text>

                <MultiSlider
                  values={sliderValue}
                  sliderLength={width - 80}
                  onValuesChange={(value) => setSliderValue(value)}
                  min={10}
                  max={2000}
                  step={10}
                  selectedStyle={styles.sliderSelectedStyle}
                  unselectedStyle={styles.sliderUnselectedStyle}
                  trackStyle={styles.sliderTrackStyle}
                  markerStyle={styles.sliderMarkerStyle}
                />
              </View>

            <TouchableOpacity style={styles.sendButton} onPress={createPost}>
              <Text style={styles.sendButtonText}>Send Invite</Text>
            </TouchableOpacity>
          </View>
        )}
      </Tab.Screen>
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Posts" component={ArtistPostsPage} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="DMs" component={DMsScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    position: 'absolute',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#00000088',
    borderRadius: 20,
    padding: 5,
  },
  pictureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  pictureButton: {
    width: '45%',
    height: 120,
    backgroundColor: '#001F3F',
    borderColor: '#00FFFF',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  buttonText: {
    color: '#00FFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  sliderValue: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  sliderSelectedStyle: {
    backgroundColor: '#FF00FF',
    borderRadius: 10,
  },
  sliderUnselectedStyle: {
    backgroundColor: '#555',
    borderRadius: 10,
  },
  sliderTrackStyle: {
    height: 10,
    borderRadius: 10,
    backgroundColor: '#444',
  },
  sliderMarkerStyle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#FF00FF',
    borderWidth: 2,
    borderColor: '#fff',
  },
  sendButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#FF0080',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HHomePage;
