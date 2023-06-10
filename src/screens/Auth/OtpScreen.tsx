import { Formik } from 'formik';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { Animated, Keyboard, Pressable } from 'react-native';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import useAuthFormAnimation from '../../animations/useAuthFormAnimation';
import { Label } from '../../components';
import { Otp } from '../../components/Screens';
import { DEFAULT_OTP_CODE } from '../../constants/defaults';
import { auths } from '../../schema';
import STYLES from '../../styles';

const OtpScreen: React.FC = () => {
  const { flexSize, startAnimation } = useAuthFormAnimation();

  useEffect(startAnimation, [startAnimation]);

  return (
    <Pressable
      style={STYLES.CONTAINERS.AUTH_CONTAINER}
      onPress={Keyboard.dismiss}
    >
      <Label.AppTitle />
      <Animated.View style={{ flex: flexSize }}>
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
