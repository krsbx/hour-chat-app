import notifee from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import _ from 'lodash';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHAT_STACK } from '../../constants/screens';
import { incrementNotification } from '../../store/actions/notifications';
import { getCurrentChat } from '../../store/selectors/currentChat';
import { navigationRef } from '../../utils/navigation';

const useNotificationHandler = () => {
  const dispatch = useDispatch();
  const { type, uuid } = useSelector(getCurrentChat);

  const onMessage = useCallback(
    async (message: FirebaseMessagingTypes.RemoteMessage) => {
      if (!message?.data) return;

      try {
        const payload: HourChat.Type.Notification = JSON.parse(
          message?.data?.payload ?? ''
        );

        console.log({
          type: type === payload.type,
          uuid: payload.uuid,
        });

        if (type === payload.type && uuid === payload.uuid) {
          if (
            navigationRef.current?.getCurrentRoute()?.name === CHAT_STACK.VIEW
          )
            return;
        }

        incrementNotification(_.pick(payload, ['type', 'uuid']))(dispatch);

        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });

        await notifee.displayNotification({
          title: payload.title,
          body: _.truncate(payload.body, { length: 30 }),
          android: {
            channelId,
          },
        });
      } catch {
        // Do nothing if there is an error
      }
    },
    [dispatch, type, uuid]
  );

  useEffect(() => {
    const unsubscribe = messaging().onMessage(onMessage);

    return () => {
      unsubscribe();
    };
  }, [onMessage]);
};

export default useNotificationHandler;
