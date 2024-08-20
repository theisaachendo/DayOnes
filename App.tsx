import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen'; // Import SplashScreen
import LoginPage from './screens/LoginPage';
import RegArtistPage from './screens/artist/RegArtistPage';
import RegFanPage from './screens/fan/RegFanPage';
import RegisterOptionPage from './screens/RegisterOptionPage'; // Import the registration option page
import TestPage from './screens/TestPage'; // Import the TestPage
import GeoLocationPage from './screens/GeolocationPage'; // Import the GeoLocationPage

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    // Hide the splash screen once the app has loaded
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterOptionPage"
          component={RegisterOptionPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegArtistPage"
          component={RegArtistPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegFanPage"
          component={RegFanPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TestPage"
          component={TestPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
  name="GeoLocationPage"
  component={GeoLocationPage}
  options={{ headerShown: false }}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
