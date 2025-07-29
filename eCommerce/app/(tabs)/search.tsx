import React from 'react';
import { StyleSheet } from 'react-native';

import { Text } from '@/components/atoms/Text';
import { ThemedView } from '@/components/ThemedView';

export default function SearchScreen() {
  return (
    <ThemedView style={styles.container}>
      <Text type="title">Search</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
