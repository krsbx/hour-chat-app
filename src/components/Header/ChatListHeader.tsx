import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Input } from '..';
import STYLES from '../../styles';
import { COLOR_PALETTE, opacityColor } from '../../utils/theme';

const ChatListHeader: React.FC<Props> = ({ query, setQuery }) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={style.container}>
      <Input.InputField
        inputStyle={style.inputStyle}
        placeholderTextColor={opacityColor(COLOR_PALETTE.WHITE, 0.8)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        {...(!isFocus && {
          placeholder: 'Hour Chat',
        })}
        style={{ flex: 1 }}
        value={query}
        onChangeText={setQuery}
      />
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
  inputStyle: {
    ...STYLES.LABELS.DEFAULT_TEXT,
    color: COLOR_PALETTE.WHITE,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderRadius: 0,
    textAlign: 'center',
    borderBottomColor: COLOR_PALETTE.NEUTRAL_20,
    borderBottomWidth: scale(2),
    padding: scale(5),
    minWidth: '60%',
  },
});

type Props = {
  query: string;
  setQuery: (value: string) => void;
};

export default ChatListHeader;
