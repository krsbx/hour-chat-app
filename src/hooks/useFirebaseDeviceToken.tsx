import notifee, { AuthorizationStatus } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { useCallback, useEffect } from 'react';
import { addDeviceToken } from '../store/actions/auth';
import useCurrentUser from './useCurrentUser';

const useFirebaseDeviceToken = () => {
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
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();

    // Get the token
    const deviceToken = await messaging().getToken();

    if (!deviceToken) return;

    addDeviceToken(currentUser.id, deviceToken);

    return deviceToken;
  }, [currentUser.id]);

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
