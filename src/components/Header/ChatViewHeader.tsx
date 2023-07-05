import { StackActions, useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/base';
import _ from 'lodash';
import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { FONT_SIZE } from '../../constants/fonts';
import { CHAT_STACK } from '../../constants/screens';
import useOverwriteBack from '../../hooks/common/useOverwriteBack';
import STYLES from '../../styles';
import { COLOR_PALETTE } from '../../utils/theme';

const ChatViewHeader: React.FC<Props> = ({ name, type }) => {
  const navigation =
    useNavigation<
      HourChat.Navigation.ChatStackNavigation<typeof CHAT_STACK.VIEW>
    >();

  const onPressOnBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.dispatch(StackActions.replace(CHAT_STACK.LIST));
  }, [navigation]);

  useOverwriteBack(onPressOnBack);

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={onPressOnBack}>
        <IonIcons
          name="arrow-back"
          size={scale(FONT_SIZE.MEDIUM)}
          color={COLOR_PALETTE.WHITE}
        />
      </TouchableOpacity>
      <View style={style.titleContainer}>
        <Text style={style.title}>[{_.capitalize(type)}]</Text>
        <Text style={style.title}>{name}</Text>
      </View>
      <View />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: COLOR_PALETTE.BLUE_10,
    alignItems: 'center',
    paddingHorizontal: scale(10),
    height: scale(45),
    gap: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: COLOR_PALETTE.NEUTRAL_40,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: scale(5),
    flex: 1,
  },
  title: {
    ...STYLES.LABELS.DEFAULT_TEXT,
    color: COLOR_PALETTE.WHITE,
    fontWeight: 'bold',
  },
});

type Props = {
  name: string;
  type: HourChat.Type.ChatType;
};

export default ChatViewHeader;
