import React, { useCallback, useMemo, useRef } from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../constants/sizes';

const SWIPE_CLOSE_OFFSET = 75;
const SWIPE_CLOSE_VELOCITY = {
  android: 1.75,
  ios: 1.55,
};

const SwipeUpToClose: React.FC<Props> = ({
  onRequestClose,
  swipeToCloseEnabled,
  children,
}) => {
  const scrollValueY = useRef(new Animated.Value(0)).current;
  const childrenOpactiy = useMemo(
    () =>
      scrollValueY.interpolate({
        inputRange: [-SWIPE_CLOSE_OFFSET, 0, SWIPE_CLOSE_OFFSET],
        outputRange: [0.7, 1, 0.7],
      }),
    [scrollValueY]
  );

  const onScrollEndDrag = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      const velocityY = nativeEvent?.velocity?.y ?? 0;
      const offsetY = nativeEvent?.contentOffset?.y ?? 0;
      const scaled = nativeEvent?.zoomScale > 1;
      const closeVelocity =
        Platform.OS === 'android'
          ? SWIPE_CLOSE_VELOCITY.android
          : SWIPE_CLOSE_VELOCITY.ios;

      if (Platform.OS === 'android') {
        if (
          (Math.abs(velocityY) > closeVelocity &&
            offsetY > SWIPE_CLOSE_OFFSET) ||
          offsetY > WINDOW_HEIGHT / 2
        ) {
          onRequestClose?.();
        }

        return;
      }

      if (
        !scaled &&
        swipeToCloseEnabled &&
        Math.abs(velocityY) > closeVelocity
      ) {
        onRequestClose?.();
      }
    },
    [onRequestClose, swipeToCloseEnabled]
  );

  const onScroll = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = nativeEvent?.contentOffset?.y ?? 0;

      if (Platform.OS === 'ios' && nativeEvent?.zoomScale > 1) return;

      scrollValueY.setValue(offsetY);
    },
    [scrollValueY]
  );

  return (
    <ScrollView
      style={styles.listItem}
      pagingEnabled
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.imageScrollContainer}
      scrollEnabled={swipeToCloseEnabled}
      onScroll={onScroll}
      onScrollEndDrag={onScrollEndDrag}
    >
      <Animated.View
        style={{
          opacity: childrenOpactiy,
          height: WINDOW_HEIGHT,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
  imageScrollContainer: {
    height: WINDOW_HEIGHT * 2,
  },
});

type Props = {
  onRequestClose?: () => void;
  swipeToCloseEnabled?: boolean;
  children?: JSX.Element;
};

export default SwipeUpToClose;
