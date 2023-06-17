import { StackActions, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  AUTH_STACK,
  CHAT_STACK,
  MAIN_STACK,
  MAIN_TAB,
} from '../constants/screens';
import { getAuth } from '../store/selectors/auth';

const useTokenListener = (isCallable: boolean) => {
  const { token, isEmailVerified } = useSelector(getAuth);

  const navigation =
    useNavigation<
      HourChat.Navigation.MainStackNavigation<typeof MAIN_STACK.LAUNCH>
    >();

  const navigateToLogin = useCallback(() => {
    navigation.dispatch(StackActions.replace(MAIN_STACK.AUTH));
  }, [navigation]);

  const navigateToChat = useCallback(() => {
    navigation.replace(MAIN_STACK.MAIN, {
      screen: MAIN_TAB.CHAT,
      params: {
        screen: CHAT_STACK.LIST,
      },
    });
  }, [navigation]);

  const navigateToOtp = useCallback(() => {
    navigation.replace(MAIN_STACK.AUTH, {
      screen: AUTH_STACK.OTP,
    });
  }, [navigation]);

  useEffect(() => {
    if (!isCallable) return;

    if (!token) {
      navigateToLogin();
      return;
    }

    if (isEmailVerified) {
      navigateToChat();
      return;
    }

    navigateToOtp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCallable, token]);
};

export default useTokenListener;
