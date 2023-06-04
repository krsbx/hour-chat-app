import { Formik } from 'formik';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Keyboard, Pressable } from 'react-native';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Labels } from '../../components';
import { Otp } from '../../components/Screens';
import { DEFAULT_OTP_CODE } from '../../constants/defaults';
import { auths } from '../../schema';
import STYLES from '../../styles';

const OtpScreen: React.FC = () => {
  const formFlexSize = useRef(new Animated.Value(0));

  const formStyle = useMemo(() => {
    const style = {
      flex: formFlexSize.current,
    };

    return style;
  }, [formFlexSize]);

  const startAnimation = useCallback(() => {
    Animated.sequence([
      Animated.timing(formFlexSize.current, {
        toValue: 5,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return (
    <Pressable
      style={STYLES.CONTAINERS.AUTH_CONTAINER}
      onPress={Keyboard.dismiss}
    >
      <Labels.AppTitle />
      <Animated.View style={[formStyle]}>
        <Formik
          validationSchema={toFormikValidationSchema(auths.otpSchema)}
          initialValues={_.cloneDeep(DEFAULT_OTP_CODE)}
          onSubmit={console.log}
          validateOnMount
        >
          <Otp.Credentials />
        </Formik>
        <Otp.BottomContainer />
      </Animated.View>
    </Pressable>
  );
};

export default OtpScreen;
