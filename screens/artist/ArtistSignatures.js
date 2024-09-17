// MySignaturesScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const ArtistSignatures = () => {
  const navigation = useNavigation();
  const username = useSelector(state => state.userProfile.username) || 'unknown';
  const [signatures, setSignatures] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSignatures = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://x4d3fe2tppuqjgz5zysgqi4sre0lpmmx.lambda-url.us-east-1.on.aws/', {
        params: {
          artistUsername: username,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setSignatures(response.data.data);
      } else {
        console.error('Failed to fetch signatures:', response);
        Alert.alert('Error', 'Failed to fetch signatures. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching signatures:', error);
      Alert.alert('Error', `Error fetching signatures: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

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
      {!signatures.length && !loading && (
        <TouchableOpacity style={styles.button} onPress={fetchSignatures}>
          <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Fetch Signatures'}</Text>
        </TouchableOpacity>
      )}
      {loading ? (
        <ActivityIndicator size="large" color="#00FFFF" />
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
