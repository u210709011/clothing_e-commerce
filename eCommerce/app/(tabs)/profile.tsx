import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/atoms/Button';
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Profile</ThemedText>
      <ThemedText style={styles.subtitle}>
        Sign in to view your profile and orders.
      </ThemedText>
      <Link href="/(auth)/sign-in" asChild>
        <Button
          title="Sign In"
          style={{ backgroundColor: Colors.light.tint }}
          textStyle={{ color: Colors.dark.text }}
        />
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 24,
  },
});
