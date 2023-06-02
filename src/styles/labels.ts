import { scale } from 'react-native-size-matters';
import STYLES from '.';
import { FONT_SIZE } from '../constants/fonts';
import { COLOR_PALETTE } from '../utils/theme';
import { flattenStyle } from './factory';

export const REQUIRED_LABEL = flattenStyle({
  color: COLOR_PALETTE.NEUTRAL_80,
  fontSize: scale(FONT_SIZE.EXTRA_SMALL),
  lineHeight: scale(FONT_SIZE.EXTRA_SMALL + 1.5),
});

export const PLACEHOLDER = flattenStyle({
  ...REQUIRED_LABEL,
  color: COLOR_PALETTE.PLACEHOLDER,
});

export const REQUIRED_STAR = flattenStyle({
  color: COLOR_PALETTE.DANGER_MAIN,
  fontWeight: 'bold',
});

export const DATE_TIME = flattenStyle({
  ...STYLES.INPUTS.DATE_TIME,
  textAlign: 'left',
  flex: 1,
});
