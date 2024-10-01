import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Image, Text, Alert, Dimensions, ImageBackground, Animated, Easing } from 'react-native';
import { useSelector } from 'react-redux';

// Import the background image
import background from '../../images/background.png'; // Adjust the path if necessary

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
    outputRange: ['rgba(255, 0, 255, 1)', 'rgba(65, 105, 225, 1)'], // Pink to blue transition with full intensity
  });

  return (
    <ImageBackground source={background} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>My Collection</Text>
        {posts.length > 0 ? (
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
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
                {post.ImageUrl && (
                  <Image
                    source={{ uri: post.ImageUrl }}
                    style={styles.postImage}
                    resizeMode="cover"
                  />
                )}
              </Animated.View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noPostsText}>No nearby posts found.</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensure the image covers the entire screen
  },
  container: {
    flex: 1,
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageFrame: {
    width: width * 0.85,
    height: height * 0.65,
    marginHorizontal: 15,
    borderRadius: 12, // Keep the rounded corners but no border
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 1.5, // Increased glow intensity for better visibility
    shadowRadius: 40, // Increased radius for stronger and larger glow
    shadowOffset: { width: 0, height: 0 }, // Centered glow
    elevation: 30, // Increased elevation for Android (deeper shadow)
  },
  postImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8, // Inner image rounded slightly to fit within the frame
  },
  noPostsText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MyCollectionsPage;
