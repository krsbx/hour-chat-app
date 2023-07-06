import React, { useCallback } from 'react';
import { View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { scale } from 'react-native-size-matters';
import { connect, ConnectedProps } from 'react-redux';
import { Header } from '../../components';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import { Profile } from '../../components/Screens';
import useCurrentUser from '../../hooks/caches/useCurrentUser';
import { updateMyData as _updateMyData } from '../../store/actions/auth';
import { uploadFiles as _uploadFiles } from '../../store/actions/files';
import { COLOR_PALETTE } from '../../utils/theme';

const MainProfile: React.FC<Props> = ({ uploadFiles, updateMyData }) => {
  const { user } = useCurrentUser();
  const onPressOnAvatar = useCallback(async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });

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
    <View
      style={{
        flex: 1,
        backgroundColor: COLOR_PALETTE.WHITE,
      }}
    >
      <FocusedStatusBar
        animated
        backgroundColor={COLOR_PALETTE.BLUE_10}
        barStyle={'light-content'}
      />
      <Header.Default noBottomLine />
      <View
        style={{
          gap: scale(5),
        }}
      >
        <Profile.Setting.UserAvatar
          user={user}
          onPressOnAvatar={onPressOnAvatar}
        />
        <Profile.Main.ItemSection />
      </View>
    </View>
  );
};

const connector = connect(null, {
  updateMyData: _updateMyData,
  uploadFiles: _uploadFiles,
});

type Props = ConnectedProps<typeof connector>;

export default connector(MainProfile);
