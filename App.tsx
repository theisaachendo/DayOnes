import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import store from './assets/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { startWatchingLocation, stopWatchingLocation } from './assets/services/geolocationService';
import LoginPage from './screens/LoginPage';
import RegArtistPage from './screens/artist/RegArtistPage';
import RegFanPage from './screens/fan/RegFanPage';
import ArtistStack from './navigation/ArtistStack';
import FanStack from './navigation/FanStack'; // FanStack already includes Tab.Navigator
import ProfileScreen from './screens/ProfileScreen';
import ArtistPostsPage from './screens/artist/ArtistPostsPage';
import SignaturePage from './screens/artist/SignaturePage';
import ArtistSignatures from './screens/artist/ArtistSignatures';
import PermissionsScreen from './screens/PermissionsScreen';
import NewSignupPage from './newUserAuth/NewSignupPage';
import VerifyAccount from './newUserAuth/VerifyAccount';
import NewLoginPage from './newUserAuth/NewLoginPage';
import EditScreen from './screens/artist/EditScreen';
import SplashVideoScreen from './screens/SplashVideoScreen'; // Import the Splash Video Screen

const Stack = createStackNavigator();

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Hide the splash screen (the default one, not the video one)
    SplashScreen.hide();

    // Start watching geolocation when the app starts
    startWatchingLocation();

    return () => {
      // Stop watching geolocation when the app unmounts
      stopWatchingLocation();
    };
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashVideoScreen">
            <Stack.Screen
              name="SplashVideoScreen"
              component={SplashVideoScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginPage"
              component={LoginPage}
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
              name="ArtistStack"
              component={ArtistStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FanStack"
              component={FanStack} // Make sure this is the only Tab.Navigator for fans
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
              name="SignaturePage"
              component={SignaturePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ArtistSignatures"
              component={ArtistSignatures}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PermissionsScreen"
              component={PermissionsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewLoginPage"
              component={NewLoginPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewSignupPage"
              component={NewSignupPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VerifyAccount"
              component={VerifyAccount}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditScreen"
              component={EditScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
