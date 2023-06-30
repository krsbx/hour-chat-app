import React from 'react';
import { View } from 'react-native';
import { Header } from '../../components';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import { COLOR_PALETTE } from '../../utils/theme';

const Setting: React.FC = () => {
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
      <Header.Default title={'My Setting'} />
    </View>
  );
};

export default Setting;
