import _ from 'lodash';
import { scale } from 'react-native-size-matters';
import { COLOR_PALETTE } from '../utils/theme';
import { flattenStyle } from './factory';
import { DEFAULT_TEXT } from './labels';

export const ERROR = flattenStyle({
  ...DEFAULT_TEXT,
  marginTop: scale(2),
  marginBottom: scale(4),
  color: COLOR_PALETTE.DANGER_MAIN,
});

export const ERROR_DATE = flattenStyle({
  ..._.omit(ERROR, ['marginBottom']),
  paddingTop: scale(5),
  paddingHorizontal: scale(5),
});
