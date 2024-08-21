import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './store/store'; // Import your Redux store

import LoginPage from './screens/LoginPage';
import RegArtistPage from './screens/artist/RegArtistPage';
import RegFanPage from './screens/fan/RegFanPage';
import RegisterOptionPage from './screens/RegisterOptionPage';
import GeolocationPage from './screens/GeolocationPage';
import ArtistStack from './navigation/ArtistStack';
import FanStack from './navigation/FanStack';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    // Hide the splash screen once the app has loaded
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}> {/* Wrap your app with Provider */}
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
    </Provider>
  );
};

export default App;
