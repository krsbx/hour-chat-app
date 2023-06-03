import { Formik } from 'formik';
import _ from 'lodash';
import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Labels, Screens } from '../../components';
import { DEFAULT_LOGIN_VALUE } from '../../constants/defaults';
import { auths } from '../../schema';

const LoginScreen = () => {
  const formFlexSize = useRef(new Animated.Value(0));
  const formOpacity = useRef(new Animated.Value(0));

  const startAnimation = useCallback(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(formFlexSize.current, {
          toValue: 2,
          duration: 1500,
          useNativeDriver: false,
          easing: Easing.elastic(1.5),
        }),
      ]),
      Animated.sequence([
        Animated.timing(formOpacity.current, {
          toValue: 1,
          delay: 750,
          duration: 750,
          useNativeDriver: false,
          easing: Easing.bounce,
        }),
      ]),
    ]).start();
  }, []);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: scale(20),
        paddingHorizontal: scale(10),
      }}
    >
      <Labels.AppTitle />
      <Animated.View
        style={{ flex: formFlexSize.current, opacity: formOpacity.current }}
      >
        <Formik
          validationSchema={toFormikValidationSchema(auths.loginSchema)}
          initialValues={_.cloneDeep(DEFAULT_LOGIN_VALUE)}
          onSubmit={console.log}
          validateOnMount
        >
          <Screens.Login.Credentials />
        </Formik>
      </Animated.View>
    </View>
  );
};

export default LoginScreen;
