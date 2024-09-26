import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert, Image, PermissionsAndroid, Platform, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import LinearGradient from 'react-native-linear-gradient';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import ProfileScreen from '../ProfileScreen';
import NotificationsScreen from '../NotificationsScreen';
import DMsScreen from '../DMsScreen';
import ArtistPostsPage from './ArtistPostsPage';

const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const HHomePage = () => {
  const [sliderValue, setSliderValue] = useState([100]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();

  const userProfile = useSelector(state => state.userProfile) || {
    username: 'unknown',
    fullName: 'Unknown User',
  };

  useEffect(() => {
    console.log("UserProfile from Redux:", userProfile);
  }, [userProfile]);

  useEffect(() => {
    if (route.params?.editedImage) {
      setSelectedImage(route.params.editedImage);
    }
  }, [route.params?.editedImage]);

  const geolocationData = useSelector(state => state.geolocationData) || {
    latitude: 0.0,
    longitude: 0.0,
    geohash: 'abc123'
  };

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

  const createPost = async () => {
    if (!selectedImage) {
      alert("Please take a picture or upload a file.");
      return;
    }

    if (!userProfile || !userProfile.username || userProfile.username === 'unknown') {
      alert("User information is missing.");
      return;
    }

    console.log("Creating post with the following details:");
    console.log("Username:", userProfile.username);
    console.log("Geolocation Data:", geolocationData);
    console.log("Slider Value:", sliderValue);

    const lambdaUrl = `https://4ytdvduogwx7sejdyh4l374fyu0wymfs.lambda-url.us-east-1.on.aws/`;

    const postData = {
      username: userProfile.username,
      postContent: "This is my new post!",
      multimediaFile: {
        content: selectedImage.base64,
        name: selectedImage.fileName || 'image.jpg',
      },
      lat: geolocationData.latitude,
      lon: geolocationData.longitude,
      geohash: geolocationData.geohash,
      locale: geolocationData.locale,
      distance: sliderValue[0],
    };

    console.log("Post data being sent:", postData);

    try {
      const response = await fetch(lambdaUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),  // Send postData directly as payload
      });

      const textResponse = await response.text();

      console.log("Raw response from Lambda:", textResponse);

      try {
        const jsonResponse = JSON.parse(textResponse);
        console.log("Parsed JSON response:", jsonResponse);

        if (response.ok) {
          alert('Post created successfully!');
        } else {
          console.error("Failed to create post:", jsonResponse);
          alert('Failed to create post.');
        }
      } catch (error) {
        console.error("Response was not JSON:", textResponse);
        alert('Received an unexpected response from the server.');
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert('Error creating post.');
    }
  };

  const feetToMeters = (feet) => {
    return Math.round(feet * 0.3048);
  };

  const handleEditClick = () => {
    if (selectedImage) {
      navigation.navigate('EditScreen', { selectedImage });
    }
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
                  <View style={styles.selectedImageContainer}>
                    <Image
                      source={{ uri: selectedImage.uri }}
                      style={styles.selectedImage}
                    />
                    <TouchableOpacity style={styles.editButton} onPress={handleEditClick}>
                      <Icon name="pencil" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
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
          </ImageBackground>
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
  selectedImageContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
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
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 5,
    borderRadius: 5,
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
