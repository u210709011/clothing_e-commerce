import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Text } from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import LoginForm from '@/components/molecules/LoginForm';
import AuthLayout from '@/components/templates/AuthLayout';
import { Stack, useRouter } from 'expo-router';

export default function SignInScreen() {
  const router = useRouter();

  return (
    <AuthLayout title="Welcome Back!" subtitle="Sign in to continue">
      <Stack.Screen options={{ title: "Sign In"}} />
      <LoginForm />
      <ThemedView style={styles.signupContainer}>
        <Text>Don't have an account? </Text>
        <Button
          title="Sign Up"
          type="link"
          onPress={() => router.push('/(auth)/sign-up')}
        />
      </ThemedView>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
