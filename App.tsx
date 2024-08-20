import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen'; // Import SplashScreen
import LoginPage from './screens/LoginPage';
import RegArtistPage from './screens/artist/RegArtistPage';
import RegFanPage from './screens/fan/RegFanPage';
import RegisterOptionPage from './screens/RegisterOptionPage'; // Import the registration option page
import GeolocationPage from './screens/GeolocationPage'; // Import the GeoLocationPage
import ArtistStack from './navigation/ArtistStack'; // Import the Artist stack
import FanStack from './navigation/FanStack'; // Import the Fan stack
import ProfileScreen from './screens/ProfileScreen'; // Import the Profile screen

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
          name="GeolocationPage"
          component={GeolocationPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
<<<<<<< HEAD
          name="GeoLocationPage"
          component={GeoLocationPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
=======
>>>>>>> 39f8bbb63ef516a0653b2291ce58c940d87786c9
          name="ArtistStack"
          component={ArtistStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FanStack"
          component={FanStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
