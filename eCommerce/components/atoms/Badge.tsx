import React from 'react';
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { Colors } from '@/constants/Colors';

interface BadgeProps {
  text: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

const Badge: React.FC<BadgeProps> = ({
  text,
  style,
  textStyle,
  variant = 'primary',
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return { backgroundColor: Colors.textSecondary };
      case 'success':
        return { backgroundColor: '#28a745' };
      case 'warning':
        return { backgroundColor: '#ffc107' };
      case 'danger':
        return { backgroundColor: '#dc3545' };
      default:
        return { backgroundColor: Colors.tint };
    }
  };

  return (
    <View style={[styles.container, getVariantStyle(), style]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.background,
  },
});

export { Badge };
export default Badge;
