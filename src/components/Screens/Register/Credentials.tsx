import { useFocusEffect } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { useFormikContext } from 'formik';
import _ from 'lodash';
import React, { useCallback } from 'react';
import { BackHandler, KeyboardAvoidingView, ScrollView } from 'react-native';
import { z } from 'zod';
import { Inputs } from '../..';
import { auths } from '../../../schema';

const Credentials: React.FC<Props> = ({ prevStep }) => {
  const { errors, handleChange, handleBlur, touched, values } =
    useFormikContext<z.infer<typeof auths.registerSchema>>();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        prevStep();

        return true;
      };

      const subs = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subs?.remove?.();
    }, [prevStep])
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Inputs.InputField
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
        <Inputs.InputField
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
        <Inputs.InputField
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
        <Inputs.InputField
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
        <Inputs.InputField
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
      <Button title={'Prev'} onPress={prevStep} />
      <Button title={'Sign Up'} disabled={!_.isEmpty(errors.step2)} />
    </KeyboardAvoidingView>
  );
};

type Props = {
  prevStep: () => void;
};

export default Credentials;
