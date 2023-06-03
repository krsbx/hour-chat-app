import React from 'react';
import { scale } from 'react-native-size-matters';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { COLOR_PALETTE } from '../../../utils/theme';

const Chat: React.FC<Props> = ({ focused, size }) => {
  return (
    <IonIcons
      name="chatbubble-ellipses"
      size={scale(size * (focused ? 0.75 : 0.7))}
      color={focused ? COLOR_PALETTE.BLUE_60 : COLOR_PALETTE.NEUTRAL_70}
    />
  );
};

type Props = HourChat.Navigation.TabIcon;

export default Chat;
