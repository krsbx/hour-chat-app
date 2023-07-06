import notifee from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import _ from 'lodash';
import { CHAT_STACK } from '../constants/screens';
import { store } from '../store';
import { incrementNotification } from '../store/actions/notifications';
import { getCurrentChat } from '../store/selectors/currentChat';
import { navigationRef } from './navigation';

const onMessageReceived = async (
  message: FirebaseMessagingTypes.RemoteMessage
) => {
  if (!message?.data) return;

  const { type, uuid } = getCurrentChat(store.getState());

  try {
    const payload: HourChat.Type.Notification = JSON.parse(
      message?.data?.payload ?? ''
    );

    if (type === payload.type && uuid === payload.uuid) {
      if (navigationRef.current?.getCurrentRoute()?.name !== CHAT_STACK.VIEW) {
        incrementNotification(_.pick(payload, ['type', 'uuid']))(
          store.dispatch
        );
      }
    }

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
};

export const handleBackgroundNotification = () => {
  notifee.onBackgroundEvent(async () => {});

  messaging().setBackgroundMessageHandler(onMessageReceived);
};
