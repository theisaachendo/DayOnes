// TestPage.js
import React from 'react';
import { SafeAreaView, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TestPage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome to the Test Page!</Text>
      <Button
        title="Go to GeoLocation Page"
        onPress={() => navigation.navigate('GeoLocationPage')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
});

export default TestPage;
