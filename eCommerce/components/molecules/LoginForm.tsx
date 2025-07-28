import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { Colors } from '@/constants/Colors';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
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
      <Button
        title="Sign In"
        onPress={handleLogin}
        style={{ backgroundColor: Colors.light.tint }}
        textStyle={{ color: Colors.dark.text }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
});

export default LoginForm;
