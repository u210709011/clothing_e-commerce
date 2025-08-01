import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import Feather from '@expo/vector-icons/Feather';
import { Text } from '@/components/atoms/Text';

export default function CategoryScreen() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Feather name="home" size={40} color="red" />
      <Text type="title">Category Screen</Text>
    </ThemedView>
  );
}





