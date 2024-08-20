// File: navigation/ArtistStack.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HHomePage from '../screens/artist/HHomePage'; // Artist's Home Page

const Stack = createStackNavigator();

const ArtistStack = () => {
  return (
    <Stack.Navigator initialRouteName="HHomePage">
      <Stack.Screen name="HHomePage" component={HHomePage} />
      {/* Add other artist-specific screens here */}
    </Stack.Navigator>
  );
};

export default ArtistStack;
