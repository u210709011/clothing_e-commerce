import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import React from 'react';

export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <Pressable
      {...props}
      onPress={(e) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        props.onPress?.(e);
      }}
      style={styles.container}
    >
      {props.children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
