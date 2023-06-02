/* eslint-disable no-bitwise */
import { StyleSheet } from 'react-native';

export const opacityColor = (hex: string, opacity: number) => {
  if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) throw new Error('Bad Hex');

  let c = hex.substring(1).split('');

  if (c.length === 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]];

  const cString = ('0x' + c.join('')) as never;

  const r = (cString >> 16) & 255;
  const g = (cString >> 8) & 255;
  const b = cString & 255;
  const rgb = [r, g, b].join(',');

  return `rgba(${rgb}, ${opacity})`;
};

export const COLOR_PALETTE = {
  // TEAL
  TEAL_100: '#00FFCA',
  TEAL_200: '#05BFDB',
  TEAL_300: '#088395',
  TEAL_400: '#0A4D68',

  // PRIMARY
  PRIMARY_MAIN: '#27374D',
  PRIMARY_SECONDARY: '#526D82',
  PRIMARY_TEXT: '#9DB2BF',
  PRIMARY_SECONDARY_TEXT: '#DDE6ED',

  // NEUTRAL
  WHITE: '#ffffff',
  BLACK: '#000000',
};

export const GLOBAL_STYLE = StyleSheet.create({});
