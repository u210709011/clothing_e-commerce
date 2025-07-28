import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/atoms/Button';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Welcome to DuyuBox!</ThemedText>
      <ThemedText type="subtitle">Your one-stop shop for the best clothing.</ThemedText>
      <View style={styles.separator} />
      <Button
        title="Shop Now"
        onPress={() => console.log('Shop Now Pressed')}
        style={{ backgroundColor: Colors.light.tint }}
        textStyle={{ color: Colors.dark.text }}
      />
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
});
