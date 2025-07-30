import React from 'react';
import { TextInput, StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '@/constants/Colors';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  containerStyle,
  inputStyle,
  labelStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, { color: Colors.text }, labelStyle]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {
            color: Colors.text,
            borderColor: Colors.icon,
            backgroundColor: Colors.background,
          },
          inputStyle,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.icon}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
});

export default Input;
