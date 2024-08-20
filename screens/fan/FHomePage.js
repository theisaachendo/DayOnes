import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const FHomePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the Fan Home Page!</Text>
      {/* Add any additional components or content for the Fan Home Page here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default FHomePage;
