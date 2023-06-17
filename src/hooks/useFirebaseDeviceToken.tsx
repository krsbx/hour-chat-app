import notifee, { AuthorizationStatus } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { AuthActionType } from '../store/actions-types/auth';

const useFirebaseDeviceToken = () => {
  const dispatch = useDispatch<AppDispatch>();

  const requestPermission = useCallback(async () => {
    const { authorizationStatus: status } = await notifee.requestPermission();

    const isEnabled = [
      AuthorizationStatus.AUTHORIZED,
      AuthorizationStatus.PROVISIONAL,
    ].includes(status);

    return {
      status,
      isEnabled,
    };
  }, []);

  const getDeviceToken = useCallback(async () => {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();

    // Get the token
    const deviceToken = await messaging().getToken();

    if (!deviceToken) return;

    dispatch({
      type: AuthActionType.UPDATE,
      payload: {
        deviceToken,
      },
    });

    return deviceToken;
  }, [dispatch]);

  useEffect(() => {
    requestPermission()
      .then(({ isEnabled }) => {
        if (!isEnabled) return;

        getDeviceToken();
      })
      .catch(() => {
        // Do nothing if there is an error
      });
  }, [getDeviceToken, requestPermission]);
};

export default useFirebaseDeviceToken;
