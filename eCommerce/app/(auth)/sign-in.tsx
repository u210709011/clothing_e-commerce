import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import LoginForm from '@/components/molecules/LoginForm';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';

const SignInScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Welcome Back!
      </ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>
        Sign in to continue
      </ThemedText>
      <LoginForm />
      <View style={styles.signupContainer}>
        <ThemedText>Don't have an account? </ThemedText>
        <Link href="/(auth)/sign-up">
          <ThemedText style={{ color: Colors.light.tint }}>Sign Up</ThemedText>
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
  signupContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
});

export default SignInScreen;
