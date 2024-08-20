import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@ptomasroos/react-native-multi-slider';  
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import ProfileScreen from '../ProfileScreen'; // Adjusted path if necessary
import PostsScreen from '../PostsScreen'; // Adjusted path if necessary
import NotificationsScreen from '../NotificationsScreen'; // Adjusted path if necessary
import DMsScreen from '../DMsScreen'; // Adjusted path if necessary

const Tab = createBottomTabNavigator();

const HHomePage = () => {
  const [sliderValue, setSliderValue] = useState([50]);
  const navigation = useNavigation();

  const takePicture = () => {
    // Your take picture logic
  };

  const uploadPicture = () => {
    // Your upload picture logic
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
              iconName = 'circle';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#7B1FA2',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Main" options={{ tabBarLabel: '' }}>
        {() => (
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Autographs & Invites</Text>
              <TouchableOpacity
                style={styles.profileButton}
                onPress={() => navigation.navigate('ProfileScreen', {
                  profile: { // Example data, replace with actual user data
                    profilePicture: 'https://example.com/profile.jpg',
                    fullName: 'John Doe',
                    username: 'johndoe',
                    email: 'johndoe@example.com',
                    phone: '123-456-7890',
                    role: 'Artist',
                  },
                })}
              >
                <Icon name="user-circle" size={30} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.pictureContainer}>
              <TouchableOpacity style={styles.pictureButton} onPress={takePicture}>
                <Icon name="camera" size={30} color="#FFFFFF" style={styles.icon} />
                <Text style={styles.buttonText}>Click Selfie</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pictureButton} onPress={uploadPicture}>
                <Icon name="picture-o" size={30} color="#FFFFFF" style={styles.icon} />
                <Text style={styles.buttonText}>Upload Pic</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sliderLabel}>Adjust Value:</Text>
            <Slider
              values={sliderValue}
              sliderLength={300}
              onValuesChange={(value) => setSliderValue(value)}
              min={0}
              max={100}
              selectedStyle={styles.sliderSelectedStyle}
              unselectedStyle={styles.sliderUnselectedStyle}
              trackStyle={styles.sliderTrackStyle}
              markerStyle={styles.sliderMarkerStyle}
            />
            <Text style={styles.sliderValue}>Value: {sliderValue[0]}</Text>

            <TouchableOpacity style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        )}
      </Tab.Screen>
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Posts" component={PostsScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="DMs" component={DMsScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  profileButton: {
    padding: 5,
  },
  pictureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  pictureButton: {
    width: 162,
    height: 115,
    backgroundColor: '#123544',
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
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sliderLabel: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  sliderSelectedStyle: {
    backgroundColor: '#7B1FA2',
    borderRadius: 8,
  },
  sliderUnselectedStyle: {
    backgroundColor: '#333',
    borderRadius: 8,
  },
  sliderTrackStyle: {
    height: 10,
    borderRadius: 10,
    backgroundColor: '#444',
  },
  sliderMarkerStyle: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    backgroundColor: '#7B1FA2',
    borderWidth: 2,
    borderColor: '#fff',
  },
  sliderValue: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  sendButton: {
    backgroundColor: '#7B1FA2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default HHomePage;
