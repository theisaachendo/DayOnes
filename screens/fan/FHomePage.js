import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import ProfileScreen from '../ProfileScreen';
import PostsScreen from '../PostsScreen';
import NotificationsScreen from '../NotificationsScreen';
import DMsScreen from '../DMsScreen';

const Tab = createBottomTabNavigator();

const FHomePage = () => {
  const navigation = useNavigation();

  const handleReceiveInvites = () => {
    // Navigate to FHomeCountdownPage
    navigation.navigate('FHomeCountdownPage');
  };

  return (
    <View style={styles.container}>
      {/* Receive Invites Button */}
      <TouchableOpacity style={styles.buttonContainer} onPress={handleReceiveInvites}>
        <LinearGradient
          colors={['#FF0080', '#FF00FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>Receive Invites</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const MainComponent = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Profile':
              iconName = 'user';
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
      <Tab.Screen name="Home" component={FHomePage} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Posts" component={PostsScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="DMs" component={DMsScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end', // Aligns the button to the bottom
    padding: 20,
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '100%',
  },
  gradientButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MainComponent;
