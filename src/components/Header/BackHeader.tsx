import { Text } from '@rneui/base';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { FONT_SIZE } from '../../constants/fonts';
import STYLES from '../../styles';
import { COLOR_PALETTE } from '../../utils/theme';

const BackHeader: React.FC<Props> = ({ onBack, title }) => {
  return (
    <View style={style.container}>
      <TouchableOpacity onPress={onBack}>
        <IonIcons
          name="arrow-back"
          size={scale(FONT_SIZE.MEDIUM)}
          color={COLOR_PALETTE.WHITE}
        />
      </TouchableOpacity>
      <View style={style.titleContainer}>
        <Text style={style.title}>{title}</Text>
      </View>
      <View />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: COLOR_PALETTE.BLUE_10,
    alignItems: 'center',
    paddingHorizontal: scale(10),
    height: scale(45),
    gap: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: COLOR_PALETTE.NEUTRAL_40,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: scale(5),
    flex: 1,
  },
  title: {
    ...STYLES.LABELS.DEFAULT_TEXT,
    color: COLOR_PALETTE.WHITE,
    fontWeight: 'bold',
  },
});

type Props = {
  onBack: () => void;
  title: string;
};

export default BackHeader;
