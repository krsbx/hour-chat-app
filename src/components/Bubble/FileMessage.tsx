import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import { scale } from 'react-native-size-matters';
import { connect, ConnectedProps } from 'react-redux';
import { Media } from '..';
import { MAX_MEDIA, MIN_MEDIA } from '../../constants/common';
import { CHAT_STACK } from '../../constants/screens';
import useFileDecryptor from '../../hooks/useFileDecryptor';
import { setEncryptor as _setEncryptor } from '../../store/actions/encryptor';
import { isMediaPreviewable } from '../../utils/chats/media';

const FileMessage: React.FC<Props> = ({ files: _files, setEncryptor }) => {
  const navigation =
    useNavigation<
      HourChat.Navigation.ChatStackNavigation<typeof CHAT_STACK.VIEW>
    >();
  const [isVisible, setIsVisible] = useState(false);

  const files = useFileDecryptor(_files);
  const isMinimal = useMemo(() => files.length === MIN_MEDIA, [files]);

  const previewableMedias = useMemo(() => {
    const medias = files.filter(isMediaPreviewable);

    return _.slice(medias, 0, MAX_MEDIA - 1);
  }, [files]);
  const firstMedia = useMemo(() => previewableMedias[0], [previewableMedias]);

  const mediaContainerStyle = useMemo(() => {
    const styles: ViewStyle[] = [style.button];

    styles.push({
      gap: scale(5),
      flexDirection: previewableMedias.length % 2 !== 0 ? 'row' : 'column',
    });

    return styles;
  }, [previewableMedias]);

  const onPressOnMore = useCallback(() => {
    setEncryptor({
      files,
    });
    navigation.push(CHAT_STACK.MEDIA);
  }, [navigation, files, setEncryptor]);

  const onPressOnPreview = useCallback(() => {
    setIsVisible((curr) => !curr);
  }, [setIsVisible]);

  if (files.length < MIN_MEDIA) return null;

  if (isMinimal && previewableMedias.length)
    return (
      <React.Fragment>
        <TouchableOpacity style={style.button} onPress={onPressOnPreview}>
          <Media.Image file={firstMedia} />
        </TouchableOpacity>
        <ImageView
          images={[firstMedia]}
          imageIndex={0}
          visible={isVisible}
          onRequestClose={onPressOnPreview}
        />
      </React.Fragment>
    );

  if (previewableMedias.length)
    return (
      <TouchableOpacity style={mediaContainerStyle} onPress={onPressOnMore}>
        <FlatList
          data={previewableMedias}
          style={style.column}
          columnWrapperStyle={style.column}
          renderItem={({ item }) => <Media.Image file={item} />}
          numColumns={2}
          keyExtractor={(item, index) => `${item.uri}-${index}`}
        />
        <Media.More />
      </TouchableOpacity>
    );

  return null;
};

const style = StyleSheet.create({
  button: {
    paddingHorizontal: scale(5),
    paddingVertical: scale(2.5),
    borderRadius: scale(10),
    marginVertical: scale(2),
  },
  column: { gap: scale(5) },
});

const connector = connect(null, {
  setEncryptor: _setEncryptor,
});

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & {
  files: HourChat.Type.File[];
  incoming?: boolean;
};

export default connector(FileMessage);
