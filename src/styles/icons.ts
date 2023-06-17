import { scale } from 'react-native-size-matters';
import { FONT_SIZE } from '../constants/fonts';
import { COLOR_PALETTE } from '../utils/theme';
import { flattenStyle } from './factory';

export const DEFAULT_ICON = flattenStyle({
  size: scale(FONT_SIZE.SMALL),
  color: COLOR_PALETTE.WHITE,
  style: {
    paddingRight: scale(5),
  },
});
