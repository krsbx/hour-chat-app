import _ from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { Card, Header } from '../../components';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import { CHAT_TYPE, RESOURCE_NAME } from '../../constants/common';
import { CHAT_STACK, MAIN_TAB, PROFILE_STACK } from '../../constants/screens';
import { AppState } from '../../store';
import { setConfig as _setConfig } from '../../store/actions/config';
import { getPrivateLastMessages } from '../../store/selectors/lastMessage';
import { getResourceData } from '../../store/selectors/resources';
import { createFullName } from '../../utils/common';
import { COLOR_PALETTE } from '../../utils/theme';

const MyConnection: React.FC<Props> = ({ users, navigation, setConfig }) => {
  const _messages = useSelector(getPrivateLastMessages);
  const [query, setQuery] = useState('');

  const navigateToChat = useCallback(
    (uuid: string) => {
      setConfig({
        name: createFullName(users[uuid]),
        type: CHAT_TYPE.PRIVATE,
        uuid,
      });

      navigation.navigate(MAIN_TAB.CHAT, {
        screen: CHAT_STACK.VIEW,
      });
    },
    [navigation, users, setConfig]
  );

  const messages = useMemo(() => {
    if (_.isEmpty(query))
      return _messages.sort((a, b) => a.uuid.localeCompare(b.uuid));

    return _messages.filter((value) => {
      const fullName = createFullName(users[value.uuid]);

      if (_.isEmpty(fullName)) return false;

      return fullName.toLowerCase().includes(query.toLowerCase());
    });
  }, [query, _messages, users]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLOR_PALETTE.WHITE,
      }}
    >
      <FocusedStatusBar
        animated
        backgroundColor={COLOR_PALETTE.BLUE_10}
        barStyle={'light-content'}
      />
      <Header.SearchHeader
        title="My Connection"
        query={query}
        setQuery={setQuery}
      />
      <FlatList
        style={{ flex: 1 }}
        data={messages}
        contentContainerStyle={{
          paddingHorizontal: scale(10),
          paddingTop: scale(10),
          paddingBottom: scale(80),
        }}
        renderItem={({ item }) => (
          <Card.User {...item} onPress={() => navigateToChat(item.uuid)} />
        )}
        keyExtractor={(item) => item.uuid}
      />
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  users: getResourceData(RESOURCE_NAME.USERS)(state),
});

const connector = connect(mapStateToProps, {
  setConfig: _setConfig,
});

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps &
  HourChat.Navigation.ProfileStackProps<typeof PROFILE_STACK.MY_CONNECTION>;

export default connector(MyConnection);
