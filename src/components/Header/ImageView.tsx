import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { flattenStyle } from '../../styles/factory';
import { COLOR_PALETTE } from '../../utils/theme';

const ImageView: React.FC<Props> = ({
  imageIndex,
  onDownload,
  onRequestClose,
}) => {
  return (
    <View style={headerStyle}>
      <TouchableOpacity onPress={() => onDownload?.(imageIndex)}>
        <MaterialIcons
          name="file-download"
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

type Props = {
  imageIndex: number;
  onDownload?: (imageIndex: number) => void;
  onRequestClose: () => void;
};

export default ImageView;
