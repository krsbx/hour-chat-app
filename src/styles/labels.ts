import { scale } from 'react-native-size-matters';
import { FONT_SIZE } from '../constants/fonts';
import { COLOR_PALETTE } from '../utils/theme';
import { flattenStyle } from './factory';

export const DEFAULT_TEXT = flattenStyle({
  color: COLOR_PALETTE.NEUTRAL_90,
  fontSize: scale(FONT_SIZE.EXTRA_EXTRA_SMALL),
});

export const REQUIRED_LABEL = flattenStyle({
  ...DEFAULT_TEXT,
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
  textAlign: 'left',
  flex: 1,
  paddingHorizontal: scale(10),
});

export const DEFAULT_LARGE = flattenStyle({
  fontSize: scale(FONT_SIZE.LARGE),
  fontWeight: 'bold',
});
