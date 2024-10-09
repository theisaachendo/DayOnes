import { Alert } from 'react-native';
import { RNS3 } from 'react-native-aws3';

export const uploadToS3 = async (imageUri, userEmail) => {
  const timestamp = Date.now();
  const fileName = `${userEmail}/${timestamp}.jpg`;

  const file = {
    uri: imageUri,
    name: fileName,
    type: 'image/jpeg',
  };

  const options = {
    keyPrefix: '', // Optional folder path in the bucket
    bucket: 'dayones-image-bucket',
    region: 'us-east-1',
    successActionStatus: 201, // Indicates successful upload
  };

  try {
    const response = await RNS3.put(file, options);
    if (response.status === 201) {
      Alert.alert("Image uploaded successfully", response.body.postResponse.location);
      return response.body.postResponse.location; // Returns S3 URL
    } else {
      throw new Error("Failed to upload image to S3");
    }
  } catch (error) {
    console.error("S3 Upload Error:", error);
    Alert.alert("Upload Failed", error.message);
    return null;
  }
};
