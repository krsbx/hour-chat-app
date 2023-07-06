import { useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect, ConnectedProps } from 'react-redux';
import { CHAT_STACK } from '../../constants/screens';
import useMediaDownloader from '../../hooks/chats/useMediaDownloader';
import { AppState } from '../../store';
import { setCurrentChat as _setCurrentChat } from '../../store/actions/currentChat';
import { getCurrentChat } from '../../store/selectors/currentChat';
import { flattenStyle } from '../../styles/factory';
import { COLOR_PALETTE } from '../../utils/theme';

const ImageView: React.FC<Props> = ({
  fileIndex,
  item,
  onRequestClose,
  currentChat,
  setCurrentChat,
}) => {
  const { params } =
    useRoute<HourChat.Navigation.ChatStackRoute<typeof CHAT_STACK.MEDIA>>();

  const isOnEdit = useMemo(() => params?.editable ?? false, [params?.editable]);

  const onDownload = useMediaDownloader();

  const onRemoveAttachment = useCallback(() => {
    const attachment = [...currentChat.attachment];
    attachment.splice(fileIndex, 1);

    setCurrentChat({
      attachment,
    });

    if (attachment.length) return;

    onRequestClose?.();
  }, [currentChat, setCurrentChat, onRequestClose, fileIndex]);

  const onPressOnAction = useCallback(() => {
    if (isOnEdit) {
      onRemoveAttachment();
      return;
    }

    onDownload(item);
  }, [isOnEdit, onDownload, item, onRemoveAttachment]);

  return (
    <View style={headerStyle}>
      <TouchableOpacity onPress={onPressOnAction}>
        <MaterialIcons
          name={isOnEdit ? 'delete' : 'file-download'}
          color={COLOR_PALETTE.WHITE}
          size={scale(20)}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onRequestClose}>
        <MaterialIcons
          name="close"
          color={COLOR_PALETTE.WHITE}
          size={scale(20)}
        />
      </TouchableOpacity>
    </View>
  );
};

const headerStyle = flattenStyle({
  gap: scale(10),
  padding: scale(10),
  justifyContent: 'flex-end',
  alignItems: 'center',
  flexDirection: 'row',
});

const mapStateToProps = (state: AppState) => ({
  currentChat: getCurrentChat(state),
});

const connector = connect(mapStateToProps, {
  setCurrentChat: _setCurrentChat,
});

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & {
  fileIndex: number;
  item: HourChat.Type.FileHref;
  onRequestClose: () => void;
};

export default connector(ImageView);
