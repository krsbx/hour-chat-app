import _ from 'lodash';
import { scale } from 'react-native-size-matters';
import { FONT_SIZE } from '../constants/fonts';
import { COLOR_PALETTE } from '../utils/theme';
import { flattenStyle } from './factory';

export const ERROR = flattenStyle({
  marginTop: scale(2),
  marginBottom: scale(4),
  color: COLOR_PALETTE.DANGER_MAIN,
  fontSize: scale(FONT_SIZE.EXTRA_EXTRA_SMALL),
});

export const ERROR_DATE = flattenStyle({
  ..._.omit(ERROR, ['marginBottom']),
  paddingTop: scale(5),
  paddingHorizontal: scale(5),
});
