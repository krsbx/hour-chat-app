/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useCallback, useMemo, useRef, useState } from 'react';

import {
  Animated,
  Dimensions,
  NativeMethodsMixin,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
} from 'react-native';

import useImageDimensions from '../hooks/useImageDimensions';
import usePanResponder from '../hooks/usePanResponder';

import { getImageStyles, getImageTransform } from '../utils';
import ImageLoading from './ImageLoading';

const SWIPE_CLOSE_OFFSET = 75;
const SWIPE_CLOSE_VELOCITY = 1.75;
const SCREEN = Dimensions.get('window');
const SCREEN_WIDTH = SCREEN.width;
const SCREEN_HEIGHT = SCREEN.height;

const ImageItem = ({
  imageSrc,
  onZoom,
  onRequestClose,
  onLongPress,
  delayLongPress,
  swipeToCloseEnabled = true,
  doubleTapToZoomEnabled = true,
}: Props) => {
  const imageContainer = useRef<ScrollView & NativeMethodsMixin>(null);
  const imageDimensions = useImageDimensions(imageSrc);
  const [translate, scale] = getImageTransform(imageDimensions, SCREEN);
  const scrollValueY = useRef(new Animated.Value(0)).current;
  const [isLoaded, setLoadEnd] = useState(false);

  const onLoaded = useCallback(() => setLoadEnd(true), []);
  const onZoomPerformed = useCallback(
    (isZoomed: boolean) => {
      onZoom(isZoomed);
      if (imageContainer?.current) {
        imageContainer.current.setNativeProps({
          scrollEnabled: !isZoomed,
        });
      }
    },
    [onZoom]
  );

  const onLongPressHandler = useCallback(() => {
    onLongPress(imageSrc);
  }, [imageSrc, onLongPress]);

  const [panHandlers, scaleValue, translateValue] = usePanResponder({
    initialScale: scale || 1,
    initialTranslate: translate || { x: 0, y: 0 },
    onZoom: onZoomPerformed,
    doubleTapToZoomEnabled,
    onLongPress: onLongPressHandler,
    delayLongPress,
  });

  const imagesStyles = useMemo(
    () => getImageStyles(imageDimensions, translateValue, scaleValue),
    [imageDimensions, scaleValue, translateValue]
  );
  const imageOpacity = useMemo(
    () =>
      scrollValueY.interpolate({
        inputRange: [-SWIPE_CLOSE_OFFSET, 0, SWIPE_CLOSE_OFFSET],
        outputRange: [0.7, 1, 0.7],
      }),
    [scrollValueY]
  );
  const imageStylesWithOpacity = { ...imagesStyles, opacity: imageOpacity };

  const onScrollEndDrag = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      const velocityY = nativeEvent?.velocity?.y ?? 0;
      const offsetY = nativeEvent?.contentOffset?.y ?? 0;

      if (
        (Math.abs(velocityY) > SWIPE_CLOSE_VELOCITY &&
          offsetY > SWIPE_CLOSE_OFFSET) ||
        offsetY > SCREEN_HEIGHT / 2
      ) {
        onRequestClose();
      }
    },
    [onRequestClose]
  );

  const onScroll = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = nativeEvent?.contentOffset?.y ?? 0;

      scrollValueY.setValue(offsetY);
    },
    [scrollValueY]
  );

  return (
    <ScrollView
      ref={imageContainer}
      style={styles.listItem}
      pagingEnabled
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.imageScrollContainer}
      scrollEnabled={swipeToCloseEnabled}
      {...(swipeToCloseEnabled && {
        onScroll,
        onScrollEndDrag,
      })}
    >
      <Animated.Image
        {...panHandlers}
        source={imageSrc}
        style={imageStylesWithOpacity as never}
        onLoad={onLoaded}
      />
      {(!isLoaded || !imageDimensions) && <ImageLoading />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  imageScrollContainer: {
    height: SCREEN_HEIGHT * 2,
  },
});

type Props = {
  imageSrc: HourChat.Type.ImageSource;
  onRequestClose: () => void;
  onZoom: (isZoomed: boolean) => void;
  onLongPress: (image: HourChat.Type.ImageSource) => void;
  delayLongPress: number;
  swipeToCloseEnabled?: boolean;
  doubleTapToZoomEnabled?: boolean;
};

export default React.memo(ImageItem);
