import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, StatusBar, View } from 'react-native';
import { Label } from '../components';
import useTokenListener from '../hooks/listeners/useTokenListener';
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
    }).start(async () => {
      setIsCompleted(true);
    });
  }, [opacity]);

  useTokenListener(isCompleted);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return (
    <View style={{ flex: 1, backgroundColor: COLOR_PALETTE.WHITE }}>
      <StatusBar
        animated
        backgroundColor={COLOR_PALETTE.WHITE}
        barStyle={'dark-content'}
      />
      <Animated.View style={{ flex: 1, opacity: opacity }}>
        <Label.AppTitle />
      </Animated.View>
    </View>
  );
};

export default LaunchScreen;
