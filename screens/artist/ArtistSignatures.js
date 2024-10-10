// MySignaturesScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSignatures } from '../../assets/hooks/useSignatures'; // Import the custom hook
import Icon from 'react-native-vector-icons/FontAwesome';

const ArtistSignatures = () => {
  const navigation = useNavigation();

  // Use the custom hook to fetch signatures
  const { data: signatures, isLoading, isError, refetch, deleteSignature } = useSignatures();

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this signature?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteSignature(id) }
      ]
    );
  };

  const renderSignature = ({ item }) => (
    <View style={styles.signatureContainer}>
      <Image source={{ uri: item.url }} style={styles.signatureImage} resizeMode="contain" />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Icon name="times-circle" size={24} color="#FF3B30" />
      </TouchableOpacity>
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
          keyExtractor={(item) => item.id}
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
    position: 'relative',
  },
  signatureImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 4,
  },
});

export default ArtistSignatures;
