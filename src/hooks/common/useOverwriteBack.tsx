import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef } from 'react';
import { BackHandler } from 'react-native';

const useOverwriteBack = (callback: () => void) => {
  const cb = useRef(callback);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        cb.current();

        return true;
      };

      const subs = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subs?.remove?.();
    }, [cb])
  );
};

export default useOverwriteBack;
