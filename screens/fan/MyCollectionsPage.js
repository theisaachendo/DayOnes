// MyCollectionsPage.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';

const MyCollectionsPage = () => {
  const [photos, setPhotos] = useState([]);
  const userData = useSelector(state => state.userData); // Access user data from Redux

  useEffect(() => {
    fetchReceivedPhotos();
  }, []);

  const fetchReceivedPhotos = async () => {
    try {
      // Fetch the photos that the fan has received from your backend
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: userData.userName }),
      });

      const result = await response.json();

      if (response.ok) {
        setPhotos(result.photos); // Adjust based on your API's response structure
      } else {
        console.error('Failed to fetch photos');
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {photos.map((photo, index) => (
          <Image
            key={index}
            source={{ uri: photo.imageUrl }}
            style={styles.photo}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  photo: {
    width: '100%',
    height: 400,
    marginBottom: 20,
  },
});

export default MyCollectionsPage;
