import _ from 'lodash';
import React, { useMemo, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect, ConnectedProps } from 'react-redux';
import { Header, Message } from '../../components';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import { RESOURCE_NAME } from '../../constants/common';
import { AppState } from '../../store';
import { getLastMessages } from '../../store/selectors/lastMessage';
import { getResourceData } from '../../store/selectors/resources';
import { flattenStyle } from '../../styles/factory';
import { createFullName, hasOwnProperty } from '../../utils/common';
import { COLOR_PALETTE } from '../../utils/theme';

const ChatList: React.FC<Props> = ({ users, messages: _messages }) => {
  const [query, setQuery] = useState('');

  const messages = useMemo(() => {
    if (_.isEmpty(query)) return _messages;

    return _messages.filter((value) => {
      if (hasOwnProperty<string>(value, 'name')) {
        return value.name.toLowerCase().includes(query.toLowerCase());
      }

      const fullName = createFullName(users[value.uuid]);

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
      <Header.SearchHeader query={query} setQuery={setQuery} />
      <FlatList
        data={messages}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: scale(10),
          paddingBottom: scale(80),
        }}
        renderItem={({ item }) => {
          if (hasOwnProperty(item, 'name'))
            return <Message.Group {...(item as HourChat.Chat.GroupMetadata)} />;

          return <Message.Private {...item} />;
        }}
        keyExtractor={(item) => `${item.uuid}`}
      />
      {__DEV__ && (
        <TouchableOpacity style={chatIconStyle} activeOpacity={0.5}>
          <MaterialIcons
            name="message"
            size={scale(25)}
            color={COLOR_PALETTE.WHITE}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const chatIconStyle = flattenStyle({
  backgroundColor: COLOR_PALETTE.BLUE_10,
  position: 'absolute',
  bottom: scale(75),
  right: scale(25),
  padding: scale(5),
  width: scale(45),
  height: scale(45),
  borderRadius: scale(45),
  alignItems: 'center',
  justifyContent: 'center',
});

const mapStateToProps = (state: AppState) => ({
  users: getResourceData(RESOURCE_NAME.USERS)(state),
  messages: getLastMessages(state),
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(ChatList);
