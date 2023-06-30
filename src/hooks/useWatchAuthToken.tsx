import { StackActions, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MAIN_STACK, MAIN_TAB } from '../constants/screens';
import { getAuth } from '../store/selectors/auth';

const useWatchAuthToken = () => {
  const { token } = useSelector(getAuth);
  const navigation =
    useNavigation<
      HourChat.Navigation.MainTabNavigation<typeof MAIN_TAB.CHAT>
    >();

  useEffect(() => {
    if (token) return;

    navigation?.dispatch?.(StackActions.replace(MAIN_STACK.AUTH));
  }, [token, navigation]);
};

export default useWatchAuthToken;
