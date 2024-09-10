import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const NotificationsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Screen</Text>
      <Button
        title="Go to Signature Test"
        onPress={() => navigation.navigate('SignatureTest')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: '#fff',
  },
});

export default NotificationsScreen;
