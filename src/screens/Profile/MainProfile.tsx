import React from 'react';
import { View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Header } from '../../components';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import { Profile } from '../../components/Screens';
import { COLOR_PALETTE } from '../../utils/theme';

const MainProfile: React.FC = () => {
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
        <Profile.Main.UserAvatar />
        <Profile.Main.ItemSection />
      </View>
    </View>
  );
};

export default MainProfile;
