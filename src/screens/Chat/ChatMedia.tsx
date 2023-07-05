import { StackActions } from '@react-navigation/native';
import { ScreenWidth } from '@rneui/base';
import _ from 'lodash';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { connect, ConnectedProps } from 'react-redux';
import { Header, Media } from '../../components';
import ImageView from '../../components/ImageView';
import { CHAT_STACK } from '../../constants/screens';
import useOverwriteBack from '../../hooks/common/useOverwriteBack';
import { AppState } from '../../store';
import { getConfig } from '../../store/selectors/config';
import { COLOR_PALETTE } from '../../utils/theme';

const ChatMedia: React.FC<Props> = ({ config, navigation, route }) => {
  const [selectedFile, setSelectedFile] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const onPressOnBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.dispatch(StackActions.replace(CHAT_STACK.VIEW));
  }, [navigation]);

  useOverwriteBack(onPressOnBack);

  const onPressOnPreview = useCallback(
    (number?: number) => {
      setIsVisible((curr) => !curr);

      if (_.isNil(number)) return;

      setSelectedFile(number);
    },
    [setIsVisible]
  );

  const onIndexChange = useCallback(
    (imageIndex: number) => {
      setSelectedFile(imageIndex);
    },
    [setSelectedFile]
  );

  return (
    <View style={style.mainContainer}>
      <StatusBar
        animated
        backgroundColor={COLOR_PALETTE.BLUE_10}
        barStyle={'light-content'}
      />
      <Header.BackHeader
        title={`[${_.capitalize(config.type)}] ${config.name}`}
        onBack={onPressOnBack}
      />
      <FlatList
        data={route.params?.editable ? config.attachment : config.files}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPressOnPreview(index)}
          >
            <Media.Image
              item={item}
              style={{
                width: ScreenWidth,
                opacity: 1,
              }}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => `${item.uri}-${index}`}
        contentContainerStyle={{
          gap: scale(5),
          padding: scale(5),
        }}
      />
      <ImageView
        files={config.files}
        isVisible={isVisible}
        fileIndex={selectedFile}
        onIndexChange={onIndexChange}
        onRequestClose={onPressOnPreview}
      />
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLOR_PALETTE.WHITE,
  },
});

const mapStateToProps = (state: AppState) => ({
  config: getConfig(state),
});

const connector = connect(mapStateToProps);

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps &
  HourChat.Navigation.ChatStackProps<typeof CHAT_STACK.MEDIA>;

export default connector(ChatMedia);
