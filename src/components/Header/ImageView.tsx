import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import { setConfig as _setConfig } from '../../store/actions/config';
import { getConfig } from '../../store/selectors/config';
import { flattenStyle } from '../../styles/factory';
import { COLOR_PALETTE } from '../../utils/theme';

const ImageView: React.FC<Props> = ({
  imageIndex,
  onDownload,
  editable,
  onRequestClose,
  config,
  setConfig,
}) => {
  const onRemoveAttachment = useCallback(() => {
    const attachment = [...config.attachment];

    attachment.splice(imageIndex, 1);

    setConfig({
      attachment,
    });

    if (attachment.length) return;

    onRequestClose?.();
  }, [config, setConfig, onRequestClose, imageIndex]);

  return (
    <View style={headerStyle}>
      {!editable ? (
        <TouchableOpacity onPress={() => onDownload?.(imageIndex)}>
          <MaterialIcons
            name="file-download"
            color={COLOR_PALETTE.WHITE}
            size={scale(20)}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onRemoveAttachment}>
          <MaterialIcons
            name="delete"
            color={COLOR_PALETTE.WHITE}
            size={scale(20)}
          />
        </TouchableOpacity>
      )}
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
  imageIndex: number;
  onDownload?: (imageIndex: number) => void;
  onRequestClose: () => void;
  editable?: boolean;
};

export default connector(ImageView);
