import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<string, ComponentProps<typeof MaterialIcons>['name']>;
export type IconName = keyof typeof MAPPING;

const MAPPING = {
  'house.fill': 'home',
  'magnifyingglass': 'search',
  'cart.fill': 'shopping-cart',
  'person.fill': 'person-outline',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'close': 'close',
} as IconMapping;


export function Icon({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
