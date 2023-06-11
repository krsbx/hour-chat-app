import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, View } from 'react-native';
import { Label } from '../components';
import useTokenListener from '../hooks/useTokenListener';
import { COLOR_PALETTE } from '../utils/theme';

const LaunchScreen = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const [isCompleted, setIsCompleted] = useState(false);

  const startAnimation = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(0.5),
      useNativeDriver: false,
    }).start(() => setIsCompleted(true));
  }, [opacity]);

  useTokenListener(isCompleted);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return (
    <View style={{ flex: 1, backgroundColor: COLOR_PALETTE.WHITE }}>
      <Animated.View style={{ flex: 1, opacity: opacity }}>
        <Label.AppTitle />
      </Animated.View>
    </View>
  );
};

export default LaunchScreen;
