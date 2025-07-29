import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Text } from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import { useAuthContext } from '@/auth/providers/AuthProvider';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const { user, signOut } = useAuthContext();
  const router = useRouter();

  if (!user) {
    return (
      <ThemedView style={styles.container}>
        <Text>Please sign in to see your profile.</Text>
        <Button title="Sign In" onPress={() => router.push('/(auth)/sign-in')} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Text type="title">Profile</Text>
      <Text>Welcome, {user.email}</Text>
      <Button title="Sign Out" onPress={signOut} />
    </ThemedView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
