// FanStack.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import FHomePage from '../screens/fan/FHomePage'; // Fan's Home Page
import MyCollectionsPage from '../screens/fan/MyCollectionsPage'; // Correct path based on your folder structure
 // "My Collections" page
import PostsScreen from '../screens/PostsScreen'; // Posts screen
import NotificationsScreen from '../screens/NotificationsScreen'; // Notifications screen
import DMsScreen from '../screens/DMsScreen'; // Direct Messages screen

const Tab = createBottomTabNavigator();

const FanStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="FHomePage"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'My Collections':
              iconName = 'star';
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
        tabBarActiveTintColor: '#FF0080',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={FHomePage}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="My Collections"
        component={MyCollectionsPage}
        options={{ tabBarLabel: 'My Collections' }}
      />
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{ tabBarLabel: 'Posts' }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ tabBarLabel: 'Notifications' }}
      />
      <Tab.Screen
        name="DMs"
        component={DMsScreen}
        options={{ tabBarLabel: 'DMs' }}
      />
    </Tab.Navigator>
  );
};

export default FanStack;
