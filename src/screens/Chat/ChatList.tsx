import React from 'react';
import { FlatList, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Screens } from '../../components';
import useChatListListener from '../../hooks/useChatListListener';
import { flattenStyle } from '../../styles/factory';
import { hasOwnProperty } from '../../utils/common';
import { COLOR_PALETTE } from '../../utils/theme';

const ChatList = () => {
  const messages = useChatListListener();

  return (
    <View style={{ flex: 1, backgroundColor: COLOR_PALETTE.WHITE }}>
      <View style={headerStyle} />
      <FlatList
        data={messages}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: scale(10) }}
        renderItem={({ item }) => {
          if (hasOwnProperty(item, 'name'))
            return (
              <Screens.Chat.Card.Group
                {...(item as HourChat.Chat.GroupMetadata)}
              />
            );

          return <Screens.Chat.Card.Private {...item} />;
        }}
        keyExtractor={(item) => `${item.timestamp.toMillis()}-${item.uuid}`}
      />
    </View>
  );
};

const headerStyle = flattenStyle({
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  backgroundColor: COLOR_PALETTE.BLUE_10,
  alignItems: 'center',
  paddingHorizontal: scale(10),
  height: scale(45),
  gap: scale(10),
  borderBottomWidth: 1,
  borderBottomColor: COLOR_PALETTE.NEUTRAL_40,
});

export default ChatList;
