import { StyleSheet, Text as NativeText, type TextProps as NativeTextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type TextProps = NativeTextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function Text({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: TextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <NativeText
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: 'InterRegular',
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontFamily: 'InterSemiBold',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontFamily: 'InterBold',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontFamily: 'InterBold',
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    fontFamily: 'InterSemiBold',
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
