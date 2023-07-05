import notifee, { AuthorizationStatus } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addDeviceToken } from '../../store/actions/auth';
import useCurrentUser from '../caches/useCurrentUser';

const useFirebaseDeviceToken = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useCurrentUser();

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
    try {
      // Register the device with FCM
      await messaging().registerDeviceForRemoteMessages();

      // Get the token
      const deviceToken = await messaging().getToken();

      if (!deviceToken) return;

      addDeviceToken(currentUser.id, deviceToken)(dispatch);

      return deviceToken;
    } catch {
      // Do nothing if there is an error
    }
  }, [currentUser.id, dispatch]);

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
