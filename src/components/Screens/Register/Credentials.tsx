import { useNavigation } from '@react-navigation/native';
import { useFormikContext } from 'formik';
import _ from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { connect, ConnectedProps } from 'react-redux';
import { z } from 'zod';
import { Buttons, Input } from '../..';
import { AUTH_STACK } from '../../../constants/screens';
import useOverwriteBack from '../../../hooks/common/useOverwriteBack';
import { auths } from '../../../schema';
import { registerUser as _registerUser } from '../../../store/actions/auth';
import { onRegisterError } from '../../../utils/errors/auth';

const Credentials: React.FC<Props> = ({ prevStep, registerUser }) => {
  const navigation =
    useNavigation<
      HourChat.Navigation.AuthStackNavigation<typeof AUTH_STACK.REGISTER>
    >();
  const { errors, handleChange, handleBlur, touched, values, setFieldError } =
    useFormikContext<z.infer<typeof auths.registerSchema>>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isDisabled = useMemo(() => !_.isEmpty(errors.step2), [errors.step2]);

  useOverwriteBack(prevStep);

  const navigateToOtp = useCallback(() => {
    navigation.replace(AUTH_STACK.OTP);
  }, [navigation]);

  const onSubmit = useCallback(async () => {
    try {
      Keyboard.dismiss();
      setIsSubmitting(true);

      await registerUser(values);

      navigateToOtp();
    } catch (error) {
      onRegisterError(error, setFieldError);
    } finally {
      setIsSubmitting(false);
    }
  }, [registerUser, values, navigateToOtp, setFieldError]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Input.InputField
          isRequired
          label={'E-mail'}
          errorMessage={errors.step2?.email}
          onChangeText={handleChange('step2.email')}
          onBlur={handleBlur('step2.email')}
          isValid={touched.step2?.email && !errors.step2?.email}
          isError={touched.step2?.email && !!errors.step2?.email}
          placeholder={'example@example.com'}
          value={values.step2.email}
        />
        <Input.InputField
          isRequired
          label={'Username'}
          errorMessage={errors.step2?.username}
          onChangeText={handleChange('step2.username')}
          onBlur={handleBlur('step2.username')}
          isValid={touched.step2?.username && !errors.step2?.username}
          isError={touched.step2?.username && !!errors.step2?.username}
          placeholder={'Your username'}
          value={values.step2.username}
        />
        <Input.InputField
          isRequired
          label={'Phone Number'}
          errorMessage={errors.step2?.phoneNumber}
          onChangeText={handleChange('step2.phoneNumber')}
          onBlur={handleBlur('step2.phoneNumber')}
          isValid={touched.step2?.phoneNumber && !errors.step2?.phoneNumber}
          isError={touched.step2?.phoneNumber && !!errors.step2?.phoneNumber}
          placeholder={'Your phone number'}
          value={values.step2.phoneNumber}
        />
        <Input.InputField
          isRequired
          label={'Password'}
          errorMessage={errors.step2?.password}
          onChangeText={handleChange('step2.password')}
          onBlur={handleBlur('step2.password')}
          isValid={touched.step2?.password && !errors.step2?.password}
          isError={touched.step2?.password && !!errors.step2?.password}
          value={values.step2.password}
          placeholder={'Your password'}
          isPassword
        />
        <Input.InputField
          isRequired
          label={'Confirm Password'}
          errorMessage={errors.step2?.confirmPassword}
          onChangeText={handleChange('step2.confirmPassword')}
          onBlur={handleBlur('step2.confirmPassword')}
          isValid={
            touched.step2?.confirmPassword && !errors.step2?.confirmPassword
          }
          isError={
            touched.step2?.confirmPassword && !!errors.step2?.confirmPassword
          }
          value={values.step2.confirmPassword}
          placeholder={'Re-type your password'}
          isPassword
        />
      </ScrollView>
      <View style={{ rowGap: scale(5), alignItems: 'center' }}>
        <Buttons.BaseButton
          title={'Prev'}
          onPress={prevStep}
          disabled={isSubmitting}
        />
        <Buttons.BaseButton
          title={'Sign Up'}
          disabled={isDisabled}
          onPress={onSubmit}
          loading={isSubmitting}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const connector = connect(null, {
  registerUser: _registerUser,
});

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & {
  prevStep: () => void;
};

export default connector(Credentials);
