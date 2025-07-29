import React from 'react';
import { StyleSheet } from 'react-native';
import { useAuthContext } from '@/auth/providers/AuthProvider';
import { ThemedView } from '@/components/ThemedView';
import { Text } from '@/components/atoms/Text';

const CartScreen = () => {
  const { user } = useAuthContext();

  return (
    <ThemedView style={styles.container}>
      <Text type="title">Cart</Text>
      {!user && (
        <Text style={styles.guestText}>
          You are browsing as a guest. Sign in to save your cart and checkout
          faster.
        </Text>
      )}
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
  guestText: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default CartScreen;
