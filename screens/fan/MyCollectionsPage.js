import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  Alert,
  Dimensions,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  PermissionsAndroid,
  Platform,
  CameraRoll,
} from 'react-native';
import { useSelector } from 'react-redux';
import RNFS from 'react-native-fs'; // Add this to download images on Android
import ProfilePictureButton from '../../assets/components/ProfilePictureButton'; // Import the ProfilePictureButton

// Import the logo
import DayOnesLogo from '../../images/DayOnesLogo.png'; // Adjust the path if necessary

const MyCollectionsPage = () => {
  const [posts, setPosts] = useState([]); // State for posts
  const locationData = useSelector(state => state.geolocationData); // Get geolocation data from Redux
  const glowAnimation = useRef(new Animated.Value(0)).current; // Animation value for the glow

  useEffect(() => {
    sendLocationData(); // Fetch posts when the component mounts
    startGlowAnimation(); // Start the glow animation when the component mounts
  }, []);

  const startGlowAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnimation, {
          toValue: 1,
          duration: 4000, // Adjust speed of color transition
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnimation, {
          toValue: 0,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const sendLocationData = async () => {
    const data = {
      geohash: locationData.geohash,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    };

    try {
      const response = await fetch('https://a55yh6pw6pks3fc7vtlfs65tli0ujdlf.lambda-url.us-east-1.on.aws/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.length > 0) {
          setPosts(result); // Save posts to state
        } else {
          setPosts([]); // Clear posts if none are found
          Alert.alert("Sorry", "No nearby posts found.");
        }
      } else {
        Alert.alert("Error", "Failed to invoke Lambda function");
      }
    } catch (error) {
      console.error("Error invoking Lambda function", error);
      Alert.alert("Error", "An unexpected error occurred");
    }
  };

  // Create an interpolation for the glow color, simulating multicolored glow transitions
  const glowColor = glowAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 215, 0, 1)', 'rgba(184, 134, 11, 1)'], // Bright gold to dark goldenrod
  });

  // Function to save an image
  const saveImage = async (imageUrl) => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Permission to save image",
            message: "App needs access to your storage to download the image",
            buttonPositive: "Allow",
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert("Permission Denied", "You need to allow storage access to save images.");
          return;
        }
      } catch (err) {
        console.warn(err);
      }
    }

    const downloadDest = `${RNFS.PicturesDirectoryPath}/${Math.floor(Date.now() / 1000)}.jpg`;
    RNFS.downloadFile({
      fromUrl: imageUrl,
      toFile: downloadDest,
    })
      .promise.then(() => {
        CameraRoll.save(downloadDest, { type: 'photo' })
          .then(() => Alert.alert('Success', 'Image saved to gallery.'))
          .catch(() => Alert.alert('Error', 'Failed to save image.'));
      })
      .catch(() => Alert.alert('Error', 'Failed to download image.'));
  };

  return (
    <View style={styles.background}>
      {/* Add Profile Picture Button in the top-left corner */}
      <ProfilePictureButton />

      <View style={styles.container}>
        {/* Add the Logo at the top */}
        <Image source={DayOnesLogo} style={styles.logo} />

        {posts.length > 0 ? (
          <ScrollView
            horizontal
            pagingEnabled
            snapToInterval={width} // Ensure snapping to each post
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {posts.map((post, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.imageFrame, // Frame container for images
                  {
                    shadowColor: glowColor, // Apply animated glow color
                  },
                ]}
              >
                <TouchableWithoutFeedback
                  onLongPress={() => saveImage(post.ImageUrl)} // Save image on long press
                >
                  <Image
                    source={{ uri: post.ImageUrl }}
                    style={styles.postImage}
                    resizeMode="cover"
                  />
                </TouchableWithoutFeedback>
              </Animated.View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noPostsText}>No nearby posts found.</Text>
        )}
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#0c002b', // Navy blue background color
  },
  container: {
    flex: 1,
    padding: 16,
  },
  logo: {
    width: 40, // Maintain the 40 width
    height: 40, // Maintain the 40 height
    alignSelf: 'center', // Center the logo horizontally
    marginBottom: 10, // Add margin to prevent cutoff
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageFrame: {
    width: width, // Take full width for proper paging
    height: height * 0.75,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 6, // Glow intensity
    shadowRadius: 50,
    shadowOffset: { width: 0, height: 0 },
    elevation: 30,
  },
  postImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'contain', // Fit the image within the frame
  },
  noPostsText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MyCollectionsPage;
