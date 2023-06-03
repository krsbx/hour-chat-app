import { scale } from 'react-native-size-matters';
import { COLOR_PALETTE } from '../utils/theme';
import { flattenStyle } from './factory';
import * as INPUTS from './inputs';

export const ICON = flattenStyle({
  height: scale(40),
  justifyContent: 'center',
  alignItems: 'center',
});

export const DATE_TIME = flattenStyle({
  ...INPUTS.DEFAULT_PADDING,
  display: 'flex',
  flexDirection: 'column',
  paddingTop: scale(5),
  paddingBottom: scale(10),
});

export const RIGHT_ICON = flattenStyle({
  paddingRight: scale(5),
});

export const RIGHT_ICON_ICON = flattenStyle({
  borderColor: COLOR_PALETTE.NEUTRAL_50,
  borderWidth: 1,
  borderLeftWidth: 0,
  borderTopRightRadius: scale(12),
  borderBottomRightRadius: scale(12),
  padding: scale(5),
});

export const RIGHT_ICON_DISABLED = INPUTS.DISABLED;

export const LEFT_ICON = flattenStyle({
  paddingLeft: scale(5),
});

export const LEFT_ICON_ICON = flattenStyle({
  borderColor: COLOR_PALETTE.NEUTRAL_50,
  borderWidth: 1,
  borderRightWidth: 0,
  borderTopLeftRadius: scale(12),
  borderBottomLeftRadius: scale(12),
  padding: scale(5),
});

export const LEFT_ICON_DISABLED = INPUTS.DISABLED;

export const AUTH_CONTAINER = {
  flex: 1,
  paddingVertical: scale(20),
  paddingHorizontal: scale(10),
};
