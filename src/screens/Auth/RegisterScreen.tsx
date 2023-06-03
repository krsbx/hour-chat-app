import { Text } from '@rneui/base';
import { Formik } from 'formik';
import _ from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Screens } from '../../components';
import { DEFAULT_REGISTER_VALUE } from '../../constants/defaults';
import { FONT_SIZE } from '../../constants/fonts';
import { WINDOW_WIDTH } from '../../constants/sizes';
import { auths } from '../../schema';

const RegisterScreen = () => {
  const [step, setStep] = useState(1);
  const formFlexSize = useRef(new Animated.Value(0));

  const nextStep = useCallback(() => {
    setStep((curr) => curr + 1);
  }, [setStep]);

  const prevStep = useCallback(() => {
    if (step <= 1) {
      setStep(1);
      return;
    }

    setStep((curr) => curr - 1);
  }, [step, setStep]);

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
    <View
      style={{
        flex: 1,
        paddingVertical: scale(20),
        paddingHorizontal: scale(10),
      }}
    >
      <Animated.View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text style={{ fontSize: scale(FONT_SIZE.LARGE), fontWeight: 'bold' }}>
          Hour Chat
        </Text>
      </Animated.View>
      <Animated.View style={{ flex: formFlexSize.current }}>
        <Screens.Register.Indicator
          step={step}
          maxStep={2}
          width={(WINDOW_WIDTH * 2) / 3}
        />
        <Formik
          validationSchema={toFormikValidationSchema(auths.registerSchema)}
          initialValues={_.cloneDeep(DEFAULT_REGISTER_VALUE)}
          onSubmit={console.log}
          validateOnMount
        >
          <Screens.Register.Step
            step={step}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        </Formik>
      </Animated.View>
    </View>
  );
};

export default RegisterScreen;
