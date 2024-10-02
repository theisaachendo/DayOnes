// FHomePage.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const FHomePage = () => {
  const navigation = useNavigation();

  const handleReceiveInvites = () => {
    navigation.navigate('FHomeCountdownPage'); // Adjust as necessary for your app's routing
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#00ffcc', '#0099cc']} style={styles.header}>
        <Text style={styles.headerText}>DayOnes Invites</Text>
      </LinearGradient>
      <View style={styles.content}>
        <Icon name="heart" size={60} color='#ff00ff' />
        <Text style={styles.noInviteText}>No Invites Yet</Text>
        <Text style={styles.subText}>You will see the invite prompt here once you get invited</Text>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleReceiveInvites}>
        <LinearGradient
          colors={['#ffcc00', '#ff8800']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>Receive Invite</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c002b', // Navy blue background color
    justifyContent: 'space-between',
  },
  header: {
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  noInviteText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  subText: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '90%',
    marginBottom: 20,
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

export default FHomePage;
