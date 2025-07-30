import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

import { HapticTab } from '@/components/HapticTab';
import { Icon } from '@/components/atoms/Icon';
import CartIconWithBadge from '@/components/molecules/CartIconWithBadge';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarButton: HapticTab,
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView
              tint="light"
              intensity={100}
              style={StyleSheet.absoluteFill}
            />
          ) : null,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'transparent',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Icon
              size={28}
              name="home"
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <Icon
              size={28}
              name="search"
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused }) => (
            <CartIconWithBadge
              size={28}
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Icon
              size={28}
              name="person-outline"
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          ),
        }}
      />
    </Tabs>
  );
}
