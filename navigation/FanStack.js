import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FHomePage from '../screens/fan/FHomePage'; // Fan's Home Page
import ProfileScreen from '../screens/ProfileScreen'; // Import the Profile screen

const Stack = createStackNavigator();

const FanStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="FHomePage"
      screenOptions={{ headerShown: false }} // This removes the headers from all screens
    >
      <Stack.Screen name="FHomePage" component={FHomePage} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      {/* Add other fan-specific screens here */}
    </Stack.Navigator>
  );
};

export default FanStack;
