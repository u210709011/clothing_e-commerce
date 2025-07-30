import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { Text } from '@/components/atoms/Text';

export default function CategoryScreen() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text type="title">Category Screen</Text>
    </ThemedView>
  );
}



