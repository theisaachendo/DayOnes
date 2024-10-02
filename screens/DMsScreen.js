import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DMsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Direct Messages Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c002b', // Navy blue background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: '#fff',
  },
});

export default DMsScreen;
