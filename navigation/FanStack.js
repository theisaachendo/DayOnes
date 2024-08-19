// File: navigation/FanStack.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FHomePage from '../screens/fan/FHomePage'; // Placeholder for Fan's Home Page
// Import other fan-specific screens here

const Stack = createStackNavigator();

const FanStack = () => {
  return (
    <Stack.Navigator initialRouteName="FHomePage">
      <Stack.Screen name="FHomePage" component={FHomePage} />
      {/* Add other fan-specific screens here */}
    </Stack.Navigator>
  );
};

export default FanStack;
