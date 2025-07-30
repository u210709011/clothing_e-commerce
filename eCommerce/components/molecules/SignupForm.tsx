import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match!");
      return;
    }
    // TODO: Handle signup logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <ThemedView style={styles.container}>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
      <Input
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm your password"
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
});

export default SignupForm;
