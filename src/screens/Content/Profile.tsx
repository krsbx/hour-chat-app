import { Text } from '@rneui/base';
import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Buttons } from '../../components';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import useCurrentUser from '../../hooks/useCurrentUser';
import STYLES from '../../styles';
import { COLOR_PALETTE } from '../../utils/theme';

const Profile = () => {
  const { fullName: currentFullName } = useCurrentUser();

  return (
    <View style={{ flex: 1, backgroundColor: COLOR_PALETTE.WHITE }}>
      <FocusedStatusBar
        animated
        backgroundColor={COLOR_PALETTE.BLUE_10}
        barStyle={'light-content'}
      />
      <View style={{ padding: scale(5), gap: scale(5) }}>
        <Text style={STYLES.LABELS.DEFAULT_TEXT}>
          {_.truncate(currentFullName, {
            length: 25,
          })}
        </Text>
        <Buttons.BaseButton title={'Logout'} />
      </View>
    </View>
  );
};

export default Profile;
