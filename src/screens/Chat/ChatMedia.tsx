import { StackActions } from '@react-navigation/native';
import { ScreenWidth } from '@rneui/base';
import React, { useCallback, useState } from 'react';
import { FlatList, StatusBar, TouchableOpacity, View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { scale } from 'react-native-size-matters';
import { connect, ConnectedProps } from 'react-redux';
import { Header, Media } from '../../components';
import { CHAT_STACK } from '../../constants/screens';
import useOverwriteBack from '../../hooks/useOverwriteBack';
import { AppState } from '../../store';
import { getEncryptor } from '../../store/selectors/encryptor';
import { COLOR_PALETTE } from '../../utils/theme';

const ChatMedia: React.FC<Props> = ({ encryptor, navigation }) => {
  const [selectedImage, setSelectedImage] = useState(0);
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

      if (number && number >= 0) setSelectedImage(number);
    },
    [setIsVisible]
  );

  return (
    <View>
      <StatusBar
        animated
        backgroundColor={COLOR_PALETTE.BLUE_10}
        barStyle={'light-content'}
      />
      <Header.BackHeader
        title={`[${encryptor.type}] ${encryptor.name}`}
        onBack={onPressOnBack}
      />
      <FlatList
        data={encryptor.files}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => onPressOnPreview(index)}>
            <Media.Image
              file={item}
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
        images={encryptor.files}
        imageIndex={selectedImage}
        visible={isVisible}
        onRequestClose={onPressOnPreview}
        keyExtractor={(item, index) => `${item.toLocaleString()}-${index}`}
      />
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  encryptor: getEncryptor(state),
});

const connector = connect(mapStateToProps);

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps &
  HourChat.Navigation.ChatStackProps<typeof CHAT_STACK.MEDIA>;

export default connector(ChatMedia);
