import React from 'react';
import { Text, StyleSheet } from 'react-native';

const LogoText = () => {
  return (
    <Text style={styles.logoText}>
      <Text style={styles.dayOnesText}>DayOnes</Text>
      <Text style={styles.ioText}>.io</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  dayOnesText: {
    color: '#00ccff', // Blue color for DayOnes
  },
  ioText: {
    color: '#fff', // White color for .io
  },
});

export default LogoText;
