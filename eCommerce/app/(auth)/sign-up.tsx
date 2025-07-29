import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Text } from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import SignupForm from '@/components/molecules/SignupForm';
import AuthLayout from '@/components/templates/AuthLayout';
import { Stack, useRouter } from 'expo-router';

export default function SignUpScreen() {
  const router = useRouter();

  return (
    <AuthLayout title="Create Account" subtitle="Join us and start shopping!">
      <SignupForm />
      <ThemedView style={styles.signinContainer}>
      <Stack.Screen options={{ title: "Sign Up"}} />
        <Text>Already have an account? </Text>
        <Button
          title="Sign In"
          type="link"
          onPress={() => router.push('/(auth)/sign-in')}
        />
      </ThemedView>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  signinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
