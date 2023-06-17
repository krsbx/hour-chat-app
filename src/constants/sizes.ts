import { Dimensions } from 'react-native';

const WINDOW = Dimensions.get('window');

export const WINDOW_WIDTH = WINDOW.width;

export const WINDOW_HEIGHT = WINDOW.height;

export const QUARTER_WINDOW = {
  WIDTH: WINDOW_WIDTH / 4,
  HEIGHT: WINDOW_HEIGHT / 4,
} as const;

export const HALF_WINDOW = {
  WIDTH: WINDOW_WIDTH / 2,
  HEIGHT: WINDOW_HEIGHT / 2,
} as const;
