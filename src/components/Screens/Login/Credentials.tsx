import { Button } from '@rneui/themed';
import { useFormikContext } from 'formik';
import _ from 'lodash';
import React from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { z } from 'zod';
import { Inputs } from '../..';
import { auths } from '../../../schema';

const Credentials = () => {
  const { errors, handleChange, handleBlur, touched, values } =
    useFormikContext<z.infer<typeof auths.loginSchema>>();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Inputs.InputField
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
        <Inputs.InputField
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
      <Button
        title="Login"
        disabled={!_.isEmpty()}
        onPress={() => console.log(values)}
      />
    </KeyboardAvoidingView>
  );
};

export default Credentials;
