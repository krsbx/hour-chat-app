import { Text } from '@rneui/base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import STYLES from '../../styles';
import { COLOR_PALETTE } from '../../utils/theme';

const NearMeHeader = () => {
  return (
    <View style={style.container}>
      <Text style={style.inputStyle}>Hour Chat</Text>
      <View style={style.bottomLine} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: COLOR_PALETTE.BLUE_10,
    alignItems: 'center',
    paddingHorizontal: scale(10),
    height: scale(45),
    borderBottomWidth: 1,
    borderBottomColor: COLOR_PALETTE.NEUTRAL_40,
  },
  inputStyle: {
    ...STYLES.LABELS.DEFAULT_TEXT,
    color: COLOR_PALETTE.WHITE,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderRadius: 0,
    textAlign: 'center',
  },
  bottomLine: {
    borderBottomColor: COLOR_PALETTE.NEUTRAL_20,
    borderBottomWidth: scale(2),
    minWidth: '94.5%',
  },
});

export default NearMeHeader;
