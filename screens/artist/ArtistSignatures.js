// MySignaturesScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useSignatures } from '../../hooks/useSignatures'; // Import the custom hook

const ArtistSignatures = () => {
  const navigation = useNavigation();
  const username = useSelector(state => state.userProfile.username) || 'unknown';

  // Use the custom hook to fetch signatures
  const { data: signatures, isLoading, isError, refetch } = useSignatures(username);

  const renderSignature = ({ item }) => (
    <View style={styles.signatureContainer}>
      <Image source={{ uri: item.Url }} style={styles.signatureImage} resizeMode="contain" />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>My Signatures</Text>
      </View>
      {!signatures?.length && !isLoading && (
        <TouchableOpacity style={styles.button} onPress={refetch}>
          <Text style={styles.buttonText}>{isLoading ? 'Loading...' : 'Fetch Signatures'}</Text>
        </TouchableOpacity>
      )}
      {isLoading ? (
        <ActivityIndicator size="large" color="#00FFFF" />
      ) : isError ? (
        <Text style={styles.errorText}>Failed to load signatures. Please try again.</Text>
      ) : (
        <FlatList
          data={signatures}
          renderItem={renderSignature}
          keyExtractor={item => item.Key}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#001F3F',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#00FFFF',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  button: {
    backgroundColor: '#001F3F',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#00FFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    alignItems: 'center',
  },
  signatureContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  signatureImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});

export default ArtistSignatures;
