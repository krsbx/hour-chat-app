import React from 'react';
import { View } from 'react-native';
import { Header } from '../../components';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import { COLOR_PALETTE } from '../../utils/theme';

const Profile = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLOR_PALETTE.WHITE }}>
      <FocusedStatusBar
        animated
        backgroundColor={COLOR_PALETTE.BLUE_10}
        barStyle={'light-content'}
      />
      <Header.Default />
    </View>
  );
};

export default Profile;
