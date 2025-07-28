import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import SignupForm from '@/components/molecules/SignupForm';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';

const SignUpScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Create Account
      </ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>
        Join us to start shopping
      </ThemedText>
      <SignupForm />
      <View style={styles.signinContainer}>
        <ThemedText>Already have an account? </ThemedText>
        <Link href="/(auth)/sign-in">
          <ThemedText style={{ color: Colors.light.tint }}>Sign In</ThemedText>
        </Link>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 32,
  },
  signinContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
});

export default SignUpScreen;
