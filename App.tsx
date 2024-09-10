import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import store from './redux/store';
import { startWatchingLocation, stopWatchingLocation } from './services/geolocationService';
import { initDB } from './services/SQLiteService'; // Import the SQLite initialization
import LoginPage from './screens/LoginPage';
import RegArtistPage from './screens/artist/RegArtistPage';
import RegFanPage from './screens/fan/RegFanPage';
import RegisterOptionPage from './screens/RegisterOptionPage';
import GeoLocationPage from './screens/GeoLocationPage';
import ArtistStack from './navigation/ArtistStack';
import FanStack from './navigation/FanStack';
import ProfileScreen from './screens/ProfileScreen';
import ArtistPostsPage from './screens/artist/ArtistPostsPage';
import SignatureTest from './screens/SignatureTest';



const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    // Hide the splash screen
    SplashScreen.hide();

    // Initialize the SQLite database
    initDB();

    // Start watching geolocation when the app starts
    startWatchingLocation();

    return () => {
      // Stop watching geolocation when the app unmounts
      stopWatchingLocation();
    };
  }, []);

  return (
    <Provider store={store}>
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
            component={GeoLocationPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
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
                    <Stack.Screen
            name="ArtistPostsPage"
            component={ArtistPostsPage}
            options={{ headerShown: false }}
          />
            <Stack.Screen
            name="SignatureTest"
            component={SignatureTest}
            options={{ headerShown: false }}
          />


        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;