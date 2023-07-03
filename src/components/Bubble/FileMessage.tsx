import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { connect, ConnectedProps } from 'react-redux';
import { Media } from '..';
import { MAX_MEDIA, MIN_MEDIA } from '../../constants/common';
import { CHAT_STACK } from '../../constants/screens';
import useFileDecryptor from '../../hooks/useFileDecryptor';
import { setConfig as _setConfig } from '../../store/actions/config';
import { isMediaPreviewable } from '../../utils/chats/media';
import ImageView from '../ImageView';

const FileMessage: React.FC<Props> = ({ files: _files, setConfig }) => {
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
    setConfig({
      files,
    });
    navigation.push(CHAT_STACK.MEDIA, {});
  }, [navigation, files, setConfig]);

  const onPressOnPreview = useCallback(() => {
    setIsVisible((curr) => !curr);
  }, [setIsVisible]);

  if (files.length < MIN_MEDIA) return null;

  if (isMinimal && previewableMedias.length)
    return (
      <React.Fragment>
        <TouchableOpacity style={style.button} onPress={onPressOnPreview}>
          <Media.Image item={firstMedia} />
        </TouchableOpacity>
        <ImageView
          files={firstMedia}
          isVisible={isVisible}
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
          renderItem={({ item }) => <Media.Image item={item} />}
          numColumns={2}
          keyExtractor={(item, index) => `${item.uri}-${index}`}
        />
        <Media.More />
      </TouchableOpacity>
    );

  return (
    <TouchableOpacity
      style={[
        mediaContainerStyle,
        { flexDirection: files.length % 2 !== 0 ? 'row' : 'column' },
      ]}
      onPress={onPressOnMore}
    >
      <FlatList
        data={files}
        style={style.column}
        columnWrapperStyle={style.column}
        renderItem={({ item, index }) => {
          if (index < 3) {
            return <Media.Image item={item} />;
          }

          return null;
        }}
        numColumns={2}
        keyExtractor={(item, index) => `${item.uri}-${index}`}
      />
      {(files.length - 1) % 2 !== 0 && <Media.More />}
    </TouchableOpacity>
  );
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
  setConfig: _setConfig,
});

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & {
  files: HourChat.Type.File[];
  incoming?: boolean;
};

export default connector(FileMessage);
