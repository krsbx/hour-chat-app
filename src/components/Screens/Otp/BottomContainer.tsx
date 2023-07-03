import { useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/base';
import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { AUTH_STACK } from '../../../constants/screens';
import STYLES from '../../../styles';
import { COLOR_PALETTE } from '../../../utils/theme';

const BottomContainer: React.FC = () => {
  const navigation =
    useNavigation<
      HourChat.Navigation.AuthStackNavigation<typeof AUTH_STACK.OTP>
    >();

  const onPressOnSignUp = useCallback(() => {
    navigation.replace(AUTH_STACK.REGISTER);
  }, [navigation]);

  const onPressOnSignIn = useCallback(() => {
    navigation.replace(AUTH_STACK.LOGIN);
  }, [navigation]);

  return (
    <View>
      <View style={styles.bottomTextContainer}>
        <Text style={STYLES.LABELS.DEFAULT_TEXT}>
          Already have a verified account?
        </Text>
        <TouchableOpacity activeOpacity={0.5} onPress={onPressOnSignIn}>
          <Text style={[STYLES.LABELS.DEFAULT_TEXT, styles.signInUpText]}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomTextContainer}>
        <Text style={STYLES.LABELS.DEFAULT_TEXT}>
          want to create another account?
        </Text>
        <TouchableOpacity activeOpacity={0.5} onPress={onPressOnSignUp}>
          <Text style={[STYLES.LABELS.DEFAULT_TEXT, styles.signInUpText]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTextContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: scale(5),
  },
  signInUpText: {
    color: COLOR_PALETTE.BLUE_40,
    fontWeight: 'bold',
  },
});

export default BottomContainer;
