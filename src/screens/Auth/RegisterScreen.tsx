import { Text } from '@rneui/base';
import { Formik } from 'formik';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Animated,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import useAuthFormAnimation from '../../animations/useAuthFormAnimation';
import { Label, Screens } from '../../components';
import { DEFAULT_REGISTER_VALUE } from '../../constants/defaults';
import { AUTH_STACK } from '../../constants/screens';
import { WINDOW_WIDTH } from '../../constants/sizes';
import { auths } from '../../schema';
import STYLES from '../../styles';
import { COLOR_PALETTE } from '../../utils/theme';

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const { flexSize, startAnimation } = useAuthFormAnimation();

  const formStyle = useMemo(() => {
    const style = {
      flex: flexSize,
      rowGap: scale(10),
    };

    return style;
  }, [flexSize]);

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

  useEffect(startAnimation, [startAnimation]);

  const onPressOnSignIn = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.replace(AUTH_STACK.LOGIN);
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
      <Animated.View style={formStyle}>
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
        <View style={styles.signUpContainer}>
          <Text style={STYLES.LABELS.DEFAULT_TEXT}>
            Already have an account?
          </Text>
          <TouchableOpacity activeOpacity={0.5} onPress={onPressOnSignIn}>
            <Text style={[STYLES.LABELS.DEFAULT_TEXT, styles.signUpText]}>
              Sign In
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

type Props = HourChat.Navigation.AuthStackProps<typeof AUTH_STACK.REGISTER>;

export default RegisterScreen;
