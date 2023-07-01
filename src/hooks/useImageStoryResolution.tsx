import _ from 'lodash';
import { useMemo } from 'react';
import { HALF_WINDOW, QUARTER_WINDOW, WINDOW_WIDTH } from '../constants/sizes';

const useImageStoryResoulution = (_resolution: {
  width: number;
  height: number;
}) => {
  const resolution = useMemo(
    () => ({
      height: _.clamp(
        _resolution.height,
        QUARTER_WINDOW.HEIGHT,
        HALF_WINDOW.HEIGHT
      ),
      width: _.clamp(_resolution.width, QUARTER_WINDOW.WIDTH, WINDOW_WIDTH),
    }),
    [_resolution.width, _resolution.height]
  );

  return resolution;
};

export default useImageStoryResoulution;
