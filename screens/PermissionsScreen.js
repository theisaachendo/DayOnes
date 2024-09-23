import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert, Platform, Linking, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useSelector } from 'react-redux';

const PermissionsScreen = () => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [libraryPermission, setLibraryPermission] = useState(false);
  const [notificationsPermission, setNotificationsPermission] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const navigation = useNavigation();
  const profile = useSelector((state) => state.userProfile);

  useEffect(() => {
    // Check all permissions on component mount
    checkAllPermissions();
  }, []);

  const checkAllPermissions = async () => {
    try {
      console.log('Checking permissions...');
      const camera = await check(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA);
      const library = await check(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      const notifications = await check(Platform.OS === 'ios' ? PERMISSIONS.IOS.NOTIFICATIONS : PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      const location = await check(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      console.log('Camera permission:', camera);
      console.log('Library permission:', library);
      console.log('Notifications permission:', notifications);
      console.log('Location permission:', location);

      setCameraPermission(camera === RESULTS.GRANTED);
      setLibraryPermission(library === RESULTS.GRANTED);
      setNotificationsPermission(notifications === RESULTS.GRANTED);
      setLocationPermission(location === RESULTS.GRANTED);

      // If all permissions are granted, navigate to the appropriate stack
      if (camera === RESULTS.GRANTED && library === RESULTS.GRANTED && notifications === RESULTS.GRANTED && location === RESULTS.GRANTED) {
        navigateToAppropriateStack(profile.role);
      }
    } catch (error) {
      console.log('Error checking permissions:', error);
    }
  };

  const openAppSettings = () => {
    Alert.alert(
      'Permission Required',
      'The app needs this permission to function correctly. Please enable it in the app settings.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
      ],
    );
  };

  const requestPermission = async (permission, setPermissionState) => {
    try {
      console.log(`Requesting permission: ${permission}`);
      const result = await request(permission);
      console.log('Permission result:', result);

      if (result === RESULTS.BLOCKED) {
        openAppSettings();
      } else {
        setPermissionState(result === RESULTS.GRANTED);
        checkAllPermissions(); // Check all permissions again after requesting
      }
    } catch (error) {
      console.log('Error requesting permission:', error);
      Alert.alert('Error', 'Failed to request permission');
    }
  };

  const navigateToAppropriateStack = (role) => {
    console.log('Navigating to stack for role:', role);
    if (role === 'artist') {
      navigation.navigate('ArtistStack');
    } else if (role === 'fan') {
      navigation.navigate('FanStack');
    } else {
      Alert.alert('Error', 'Unrecognized user role.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require('../images/background.png')} // Set your background image here
        style={styles.backgroundImage}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>Permissions</Text>

          <PermissionItem
            icon="camera"
            title="Camera"
            enabled={cameraPermission}
            onPress={() => requestPermission(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA, setCameraPermission)}
          />
          <PermissionItem
            icon="folder"
            title="Library"
            enabled={libraryPermission}
            onPress={() => requestPermission(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, setLibraryPermission)}
          />
          <PermissionItem
            icon="bell"
            title="Push Notifications"
            enabled={notificationsPermission}
            onPress={() => requestPermission(Platform.OS === 'ios' ? PERMISSIONS.IOS.NOTIFICATIONS : PERMISSIONS.ANDROID.POST_NOTIFICATIONS, setNotificationsPermission)}
          />
          <PermissionItem
            icon="map-marker"
            title="Location"
            enabled={locationPermission}
            onPress={() => requestPermission(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, setLocationPermission)}
          />

          <LinearGradient colors={['#ff00ff', '#7000ff']} style={styles.continueButton}>
            <TouchableOpacity
              onPress={() => navigateToAppropriateStack(profile.role)}
              style={styles.fullWidth}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

// Permission Item Component
const PermissionItem = ({ icon, title, enabled, onPress }) => (
  <View style={styles.permissionItem}>
    <Icon name={icon} size={24} color="#fff" />
    <Text style={styles.permissionText}>{title}</Text>
    <TouchableOpacity style={[styles.permissionButton, enabled ? styles.enabled : styles.disabled]} onPress={onPress}>
      <Text style={styles.permissionButtonText}>{enabled ? 'Enabled' : 'Allow'}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 8,
  },
  permissionText: {
    color: '#fff',
    fontSize: 18,
  },
  permissionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  enabled: {
    backgroundColor: '#00ff00',
  },
  disabled: {
    backgroundColor: '#ff8800',
  },
  permissionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  continueButton: {
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  fullWidth: {
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PermissionsScreen;
