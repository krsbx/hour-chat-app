import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

export const flattenStyle = <T extends ViewStyle | TextStyle | ImageStyle>(
  style: T
) => StyleSheet.flatten(style);
