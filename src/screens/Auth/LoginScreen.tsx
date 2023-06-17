import { Text } from '@rneui/base';
import { Formik } from 'formik';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StatusBar, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { scale } from 'react-native-size-matters';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Label, Screens } from '../../components';
import { DEFAULT_LOGIN_VALUE } from '../../constants/defaults';
import { AUTH_STACK } from '../../constants/screens';
import { auths } from '../../schema';
import STYLES from '../../styles';
import { COLOR_PALETTE } from '../../utils/theme';

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const formFlexSize = useRef(new Animated.Value(0)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;

  const formStyle = useMemo(() => {
    const style = {
      flex: formFlexSize,
      opacity: formOpacity,
      rowGap: scale(10),
    };

    return style;
  }, [formFlexSize, formOpacity]);

  const startAnimation = useCallback(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(formFlexSize, {
          toValue: 2,
          duration: 1500,
          useNativeDriver: false,
          easing: Easing.elastic(1.5),
        }),
      ]),
      Animated.sequence([
        Animated.timing(formOpacity, {
          toValue: 1,
          delay: 750,
          duration: 750,
          useNativeDriver: false,
          easing: Easing.bounce,
        }),
      ]),
    ]).start();
  }, [formFlexSize, formOpacity]);

  const onPressOnSignUp = useCallback(() => {
    navigation.push(AUTH_STACK.REGISTER);
  }, [navigation]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return (
    <View style={STYLES.CONTAINERS.AUTH_CONTAINER}>
      <StatusBar
        animated
        backgroundColor={COLOR_PALETTE.WHITE}
        barStyle={'dark-content'}
      />
      <Label.AppTitle />
      <Animated.View style={[formStyle]}>
        <Formik
          validationSchema={toFormikValidationSchema(auths.loginSchema)}
          initialValues={_.cloneDeep(DEFAULT_LOGIN_VALUE)}
          onSubmit={console.log}
          validateOnMount
        >
          <Screens.Login.Credentials />
        </Formik>
        <View style={styles.signUpContainer}>
          <Text style={STYLES.LABELS.DEFAULT_TEXT}>Don't have an account?</Text>
          <TouchableOpacity activeOpacity={0.5} onPress={onPressOnSignUp}>
            <Text style={[STYLES.LABELS.DEFAULT_TEXT, styles.signUpText]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  signUpContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: scale(5),
  },
  signUpText: {
    color: COLOR_PALETTE.BLUE_40,
    fontWeight: 'bold',
  },
});

type Props = HourChat.Navigation.AuthStackProps<typeof AUTH_STACK.LOGIN>;

export default LoginScreen;
