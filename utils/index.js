import {BASE_URL} from '../config/config';

async function getBlob(fileUri) {
  const resp = await fetch(fileUri);
  const imageBody = await resp.blob();
  return imageBody;
}

export const uploadImageToBucket = async (uri, keyPath, accessToken) => {
  const fileName = new Date().getTime();
  const imageBody = await getBlob(uri);
  const imageType = imageBody['type'];

  keyPath = `${keyPath}/${fileName}.jpg`;

  console.log('keyPath', keyPath);

  try {
    const awsSignedUrl = await getAWSsignedUrl(keyPath, imageType, accessToken);

    console.log('awsSignedUrl::::----', awsSignedUrl);
  } catch (error) {
    console.log('error:::--------', error);
  }

  return '';
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', imageType);

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: imageBody,
    redirect: 'follow',
  };

  try {
    const response = await axios.put(s3BucketUrl, file, {
      headers: myHeaders,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

const getAWSsignedUrl = async (path, fileMimeType, accessToken) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/s3`, {
      method: 'GET', // Specify the method
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        path: path,
        fileMimeType: fileMimeType,
        isUpload: true,
      }),
    });

    console.log('response', response);

    if (!response.ok) {
      throw new Error('Network response was not ok'); // Handle errors
    }

    const data = await response.json(); // Parse the JSON response
    return data;
  } catch (error) {
    console.error(error); // Handle the error as needed
  }
};
