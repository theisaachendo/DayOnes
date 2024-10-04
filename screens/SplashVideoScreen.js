import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';

const SplashVideoScreen = () => {
  const navigation = useNavigation();

  const handleVideoEnd = () => {
    // Navigate to the login page after video ends
    navigation.replace('LoginPage');
  };

  return (
    <View style={styles.container}>
     <Video
  source={require('../assets/images/DayOnesSplashMockup.mp4')} // Make sure to use the correct file extension and path
  style={styles.video}
  resizeMode="cover"
  rate={3.5} // Adjust the speed as needed
  onEnd={handleVideoEnd} // Trigger navigation to login page after the video ends
  fullscreen={true} // Make the video fullscreen
  repeat={false} // Do not loop the video
  controls={false} // Hide video controls
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default SplashVideoScreen;
