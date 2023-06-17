import _ from 'lodash';
import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { connect, ConnectedProps } from 'react-redux';
import { Header, Message } from '../../components';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import { RESOURCE_NAME } from '../../constants/common';
import useChatListListener from '../../hooks/useChatListListener';
import { AppState } from '../../store';
import { getResourceData } from '../../store/selectors/resources';
import { createFullName, hasOwnProperty } from '../../utils/common';
import { COLOR_PALETTE } from '../../utils/theme';

const ChatList: React.FC<Props> = ({ users }) => {
  const _messages = useChatListListener();
  const [query, setQuery] = useState('');

  const messages = useMemo(() => {
    if (_.isEmpty(query)) return _messages;

    return _messages.filter((value) => {
      if (hasOwnProperty<string>(value, 'name')) {
        return value.name.toLowerCase().includes(query.toLowerCase());
      }

      const fullName = createFullName(users[+value.uuid]);

      if (_.isEmpty(fullName)) return false;

      return fullName.toLowerCase().includes(query.toLowerCase());
    });
  }, [query, _messages, users]);

  return (
    <View style={{ flex: 1, backgroundColor: COLOR_PALETTE.WHITE }}>
      <FocusedStatusBar
        animated
        backgroundColor={COLOR_PALETTE.BLUE_10}
        barStyle={'light-content'}
      />
      <Header.ChatList query={query} setQuery={setQuery} />
      <FlatList
        data={messages}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: scale(10) }}
        renderItem={({ item }) => {
          if (hasOwnProperty(item, 'name'))
            return <Message.Group {...(item as HourChat.Chat.GroupMetadata)} />;

          return <Message.Private {...item} />;
        }}
        keyExtractor={(item) => `${item.timestamp.toMillis()}-${item.uuid}`}
      />
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  users: getResourceData(RESOURCE_NAME.USERS)(state),
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(ChatList);
