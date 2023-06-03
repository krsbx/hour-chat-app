import _ from 'lodash';
import { scale } from 'react-native-size-matters';
import { FONT_SIZE } from '../constants/fonts';
import { COLOR_PALETTE } from '../utils/theme';
import { flattenStyle } from './factory';

export const DEFAULT_PADDING = flattenStyle({
  marginHorizontal: 0,
  paddingVertical: scale(5),
  paddingHorizontal: scale(10),
});

export const INPUT = flattenStyle({
  ...DEFAULT_PADDING,
  borderRadius: scale(12),
  borderWidth: scale(1),
  fontSize: scale(FONT_SIZE.EXTRA_SMALL),
  borderColor: COLOR_PALETTE.NEUTRAL_50,
  color: COLOR_PALETTE.BLACK,
});

export const DISABLED = flattenStyle({
  borderColor: COLOR_PALETTE.NEUTRAL_60,
  backgroundColor: COLOR_PALETTE.NEUTRAL_40,
  opacity: 0.5,
});

export const ERROR = flattenStyle({
  borderColor: COLOR_PALETTE.DANGER_MAIN,
});

export const VALID = flattenStyle({
  borderColor: COLOR_PALETTE.SUCCESS_MAIN,
});

export const DATE_TIME = flattenStyle({
  ..._.omit(INPUT, [
    'marginHorizontal',
    'paddingHorizontal',
    'paddingVertical',
  ]),
  alignItems: 'center',
  height: scale(40),
  flexDirection: 'row',
});

export const RIGHT_ICON = flattenStyle({
  borderRightWidth: 0,
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
});

export const LEFT_ICON = flattenStyle({
  borderLeftWidth: 0,
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
});
