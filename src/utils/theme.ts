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
  NEUTRAL_20: '#EBF1F6',
  NEUTRAL_30: '#E4EAEF',
  NEUTRAL_40: '#D7DFE5',
  NEUTRAL_50: '#BAC5CD',
  NEUTRAL_60: '#98A6B0',
  NEUTRAL_70: '#8796A1',
  NEUTRAL_80: '#5D717F',
  NEUTRAL_90: '#3D5565',
  NEUTRAL_100: '#0A2639',

  // DANGER
  DANGER_MAIN: '#D8291A',
  DANGER_PRESSED: '#67041D',

  // SUCCESS
  SUCCESS_MAIN: '#27A825',
  SUCCESS_PRESSED: '#07501F',

  // TEXT
  get PLACEHOLDER() {
    return this.NEUTRAL_70;
  },

  // BLUE
  BLUE_10: '#4AA5F0',
  BLUE_20: '#3D9FEF',
  BLUE_30: '#2F98EE',
  BLUE_40: '#218FE8',
  BLUE_50: '#1285E2',
  BLUE_60: '#117AD0',
  BLUE_70: '#0F6FBD',
  BLUE_80: '#0E64AA',
  BLUE_90: '#0C5997',
  BLUE_100: '#094271',

  // ROYAL BLUE
  ROYAL_BLUE_10: '#A8BFF0',
  ROYAL_BLUE_20: '#96B2ED',
  ROYAL_BLUE_30: '#628BE4',
  ROYAL_BLUE_40: '#85A5EA',
  ROYAL_BLUE_50: '#7398E7',
  ROYAL_BLUE_60: '#628BE4',
  ROYAL_BLUE_70: '#517EE1',
  ROYAL_BLUE_80: '#3F72DE',
  ROYAL_BLUE_90: '#2E65DC',
  ROYAL_BLUE_100: '#4476de',
};

export const GLOBAL_STYLE = StyleSheet.create({});
