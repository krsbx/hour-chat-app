import { StackActions, useNavigation } from '@react-navigation/native';
import { useFormikContext } from 'formik';
import _ from 'lodash';
import React, { useCallback, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { z } from 'zod';
import { Buttons, Input } from '../..';
import { AUTH_STACK, MAIN_STACK, MAIN_TAB } from '../../../constants/screens';
import { auths } from '../../../schema';
import { loginUser as _loginUser } from '../../../store/actions/auth';
import { onLoginError } from '../../../utils/errors/auth';

const Credentials: React.FC<Props> = ({ loginUser }) => {
  const navigation =
    useNavigation<
      HourChat.Navigation.AuthStackNavigation<typeof AUTH_STACK.LOGIN>
    >();
  const { errors, handleChange, handleBlur, touched, values, setFieldError } =
    useFormikContext<z.infer<typeof auths.loginSchema>>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigateToOtp = useCallback(() => {
    navigation.replace(AUTH_STACK.OTP);
  }, [navigation]);

  const navigateToChat = useCallback(() => {
    navigation.dispatch(
      StackActions.replace(MAIN_STACK.MAIN, {
        screen: MAIN_TAB.CHAT,
      })
    );
  }, [navigation]);

  const onSubmit = useCallback(async () => {
    try {
      Keyboard.dismiss();
      setIsSubmitting(true);

      const { isEmailVerified } = await loginUser(values);

      if (isEmailVerified) {
        navigateToChat();
        return;
      }

      navigateToOtp();
    } catch (error) {
      onLoginError(error, setFieldError);
    } finally {
      setIsSubmitting(false);
    }
  }, [loginUser, values, navigateToOtp, navigateToChat, setFieldError]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Input.InputField
          isRequired
          label={'E-mail/Username'}
          errorMessage={errors.identifier}
          onChangeText={handleChange('identifier')}
          onBlur={handleBlur('identifier')}
          isValid={touched.identifier && !errors.identifier}
          isError={touched.identifier && !!errors.identifier}
          placeholder={'Your e-mail/username'}
          value={values.identifier}
        />
        <Input.InputField
          isRequired
          label={'Password'}
          errorMessage={errors.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          isValid={touched.password && !errors.password}
          isError={touched.password && !!errors.password}
          value={values.password}
          placeholder={'Your password'}
          isPassword
        />
      </ScrollView>
      <View style={{ alignItems: 'center' }}>
        <Buttons.BaseButton
          title="Login"
          disabled={!_.isEmpty(errors)}
          onPress={onSubmit}
          loading={isSubmitting}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const connector = connect(null, {
  loginUser: _loginUser,
});

type Props = ConnectedProps<typeof connector>;

export default connector(Credentials);
