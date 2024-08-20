import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HHomePage from '../screens/artist/HHomePage'; // Artist's Home Page
import ProfileScreen from '../screens/ProfileScreen'; // Import the Profile screen

const Stack = createStackNavigator();

const ArtistStack = () => {
  return (
    <Stack.Navigator initialRouteName="HHomePage">
      <Stack.Screen name="HHomePage" component={HHomePage} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      {/* Add other artist-specific screens here */}
    </Stack.Navigator>
  );
};

export default ArtistStack;
