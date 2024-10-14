import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { BASEURL } from '../assets/constants';

const VerifyAccount = () => {
  const [email, setEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [resendEmail, setResendEmail] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const passedEmail = route.params?.email || ''; // Get the email passed from the signup page or use an empty string

  // Set email and resendEmail to the passedEmail on component mount if passedEmail exists
  useEffect(() => {
    if (passedEmail) {
      setEmail(passedEmail);
      setResendEmail(passedEmail);
    }
  }, [passedEmail]);

  const handleVerification = async () => {
    if (!email || !confirmationCode) {
      Alert.alert('Validation Error', 'Please enter your email and the verification code.');
      return;
    }

    try {
      const response = await axios.post(`${BASEURL}/api/v1/auth/verify`, {
        username: email,
        confirmationCode,
      });

      if (response.status === 200) {
        Alert.alert('Verification Successful', 'Your account has been verified.');
        navigation.navigate('LoginPage'); // Redirect to login page after verification
      } else {
        Alert.alert('Verification Failed', 'Invalid verification code. Please try again.');
      }
    } catch (error) {
      Alert.alert('Verification Error', error.response?.data?.message || 'An unexpected error occurred.');
    }
  };

  const handleResendEmail = async () => {
    const emailToResend = resendEmail || email;
    if (!emailToResend) {
      Alert.alert('Validation Error', 'Please enter an email to resend the verification code.');
      return;
    }

    try {
      const response = await axios.post(`${BASEURL}/api/v1/auth/resend-confirm-email`, {
        username: emailToResend,
      });

      if (response.status === 200) {
        Alert.alert('Resend Successful', `A new confirmation email has been sent to ${emailToResend}.`);
      } else {
        Alert.alert('Resend Failed', 'Something went wrong. Please try again.');
      }
    } catch (error) {
      Alert.alert('Resend Error', error.response?.data?.message || 'An unexpected error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Verification</Text>

      <TextInput
        style={styles.input}
        placeholder="Email for Verification"
        placeholderTextColor="#888"
        value={email} // Prefill with the passed email if available
        onChangeText={setEmail} // Make the email field editable
      />

      <TextInput
        style={styles.input}
        placeholder="Verification Code"
        placeholderTextColor="#888"
        value={confirmationCode}
        onChangeText={setConfirmationCode}
      />

      <TouchableOpacity style={styles.button} onPress={handleVerification}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TextInput
        style={styles.input}
        placeholder="Email to Resend Code"
        placeholderTextColor="#888"
        value={resendEmail} // Prefill with the passed email for resending if available
        onChangeText={setResendEmail} // Make the resend email field editable
      />

      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleResendEmail}>
        <Text style={styles.buttonText}>Resend Email</Text>
      </TouchableOpacity>

      {/* Link to NewSignupPage */}
      <TouchableOpacity style={[styles.button, styles.signupButton]} onPress={() => navigation.navigate('NewSignupPage')}>
        <Text style={styles.buttonText}>Go to Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#fff',
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#ff8800',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  secondaryButton: {
    backgroundColor: '#555',
  },
  signupButton: {
    backgroundColor: '#00aaff',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 20,
    borderBottomColor: '#555',
    borderBottomWidth: 1,
  },
});

export default VerifyAccount;
