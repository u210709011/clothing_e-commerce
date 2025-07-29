import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../atoms/Text';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text type="title" style={styles.title}>
          {title}
        </Text>
        <Text type="subtitle" style={styles.subtitle}>
          {subtitle}
        </Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 32,
  },
});

export default AuthLayout;
