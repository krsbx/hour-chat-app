import { useCallback, useRef } from 'react';
import { Animated } from 'react-native';

const useAuthFormAnimation = () => {
  const flexSize = useRef(new Animated.Value(0)).current;

  const startAnimation = useCallback(() => {
    Animated.sequence([
      Animated.timing(flexSize, {
        toValue: 5,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  }, [flexSize]);

  return { startAnimation, flexSize };
};

export default useAuthFormAnimation;
