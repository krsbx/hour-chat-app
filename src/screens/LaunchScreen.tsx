import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, View } from 'react-native';
import { Labels } from '../components';
import useTokenListener from '../hooks/useTokenListener';
import { COLOR_PALETTE } from '../utils/theme';

const LaunchScreen = () => {
  const opacity = useRef(new Animated.Value(0));
  const [isCompleted, setIsCompleted] = useState(false);

  const startAnimation = useCallback(() => {
    Animated.timing(opacity.current, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(0.5),
      useNativeDriver: false,
    }).start();

    opacity.current.addListener((state) => {
      setIsCompleted(state.value >= 1);
    });
  }, []);

  useTokenListener(isCompleted);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return (
    <View style={{ flex: 1, backgroundColor: COLOR_PALETTE.WHITE }}>
      <Animated.View style={{ flex: 1, opacity: opacity.current }}>
        <Labels.AppTitle />
      </Animated.View>
    </View>
  );
};

export default LaunchScreen;
