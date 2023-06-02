import { scale } from 'react-native-size-matters';
import { flattenStyle } from './factory';

export const ICON = flattenStyle({
  height: scale(40),
  justifyContent: 'center',
  alignItems: 'center',
  paddingRight: scale(4),
  marginVertical: scale(4),
});

export const DATE_TIME = flattenStyle({
  display: 'flex',
  flexDirection: 'column',
  paddingVertical: scale(5),
});
