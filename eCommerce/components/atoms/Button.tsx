import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors } from '@/constants/Colors';

interface ButtonProps {
  title?: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  type?: 'default' | 'link' | 'chip';
  selected?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  type = 'default',
  selected = false,
  children,
}) => {
  const isChip = type === 'chip';
  return (
    <TouchableOpacity
      style={[
        type === 'default' && styles.button,
        isChip && styles.chip,
        isChip && selected && styles.chipSelected,
        style,
      ]}
      onPress={onPress}
    >
      {title ? (
        <Text
          style={[
            styles.text,
            type === 'link' && styles.link,
            isChip && styles.chipText,
            isChip && selected && styles.chipSelectedText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.tint,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  link: {
    color: Colors.tint,
    fontWeight: 'normal',
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  chipSelected: {
    backgroundColor: '#333',
    borderColor: '#333',
  },
  chipText: {
    fontSize: 14,
    color: '#333',
  },
  chipSelectedText: {
    color: '#fff',
  },
});

export default Button;
