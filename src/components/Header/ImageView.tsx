import { useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect, ConnectedProps } from 'react-redux';
import { CHAT_STACK } from '../../constants/screens';
import useChatMediaDownloader from '../../hooks/useChatMediaDownloader';
import { AppState } from '../../store';
import { setConfig as _setConfig } from '../../store/actions/config';
import { getConfig } from '../../store/selectors/config';
import { flattenStyle } from '../../styles/factory';
import { COLOR_PALETTE } from '../../utils/theme';

const ImageView: React.FC<Props> = ({
  fileIndex,
  item,
  onRequestClose,
  config,
  setConfig,
}) => {
  const { params } =
    useRoute<HourChat.Navigation.ChatStackRoute<typeof CHAT_STACK.MEDIA>>();

  const isOnEdit = useMemo(() => params?.editable ?? false, [params?.editable]);

  const onDownload = useChatMediaDownloader();

  const onRemoveAttachment = useCallback(() => {
    const attachment = [...config.attachment];
    attachment.splice(fileIndex, 1);

    setConfig({
      attachment,
    });

    if (attachment.length) return;

    onRequestClose?.();
  }, [config, setConfig, onRequestClose, fileIndex]);

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
  config: getConfig(state),
});

const connector = connect(mapStateToProps, {
  setConfig: _setConfig,
});

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & {
  fileIndex: number;
  item: HourChat.Type.FileHref;
  onRequestClose: () => void;
};

export default connector(ImageView);
