import { Text } from '@rneui/base';
import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from 'react-redux';
import { Icon } from '../../..';
import { FONT_SIZE } from '../../../../constants/fonts';
import useCurrentUser from '../../../../hooks/useCurrentUser';
import useUserGenderIcon from '../../../../hooks/useUserGenderIcon';
import { updateMyData as _updateMyData } from '../../../../store/actions/auth';
import { uploadFiles as _uploadFiles } from '../../../../store/actions/files';
import STYLES from '../../../../styles';
import { COLOR_PALETTE, opacityColor } from '../../../../utils/theme';

const UserAvatar: React.FC<Props> = ({ uploadFiles, updateMyData }) => {
  const { fullName, user: currentUser } = useCurrentUser();
  const { iconColor, iconName } = useUserGenderIcon(currentUser);

  const onPressOnAvatar = useCallback(async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        copyTo: 'cachesDirectory',
      });

      if (!result.fileCopyUri) return;

      const { data } = await uploadFiles(result as never);
      const [newAvatarUri] = data;

      await updateMyData({
        avatar: newAvatarUri,
      });
    } catch {
      // Do nothing if there is an error
    }
  }, [uploadFiles, updateMyData]);

  return (
    <View style={style.userContainer}>
      <TouchableOpacity
        style={style.avatarMainContainer}
        onPress={onPressOnAvatar}
      >
        <Icon.DefaultAvatar
          containerStyle={style.avatarContainer}
          user={currentUser}
          name={fullName}
          size={scale(100)}
        />
        <View style={style.gender}>
          <Ionicons name={iconName} size={scale(15)} color={iconColor} />
        </View>
      </TouchableOpacity>
      <Text style={style.fullName}>{fullName}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  userContainer: {
    gap: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_PALETTE.BLUE_10,
    padding: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: COLOR_PALETTE.NEUTRAL_40,
  },
  fullName: {
    ...STYLES.LABELS.DEFAULT_TEXT,
    fontSize: scale(FONT_SIZE.SMALL),
    color: COLOR_PALETTE.WHITE,
  },
  gender: {
    width: scale(25),
    height: scale(25),
    padding: scale(5),
    backgroundColor: COLOR_PALETTE.NEUTRAL_20,
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: scale(5),
    right: scale(5),
  },
  avatarContainer: {
    backgroundColor: COLOR_PALETTE.BLUE_30,
    borderColor: opacityColor(COLOR_PALETTE.WHITE, 0.3),
    borderWidth: scale(2),
  },
  avatarMainContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
});

const connector = connect(null, {
  uploadFiles: _uploadFiles,
  updateMyData: _updateMyData,
});

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps;

export default connector(UserAvatar);
