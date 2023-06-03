import { Button } from '@rneui/themed';
import { AxiosError } from 'axios';
import { useFormikContext } from 'formik';
import _ from 'lodash';
import React, { useCallback } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { z } from 'zod';
import { Inputs } from '../..';
import { auths } from '../../../schema';
import { loginUser as _loginUser } from '../../../store/actions/auth';

const Credentials: React.FC<Props> = ({ loginUser }) => {
  const { errors, handleChange, handleBlur, touched, values, setFieldError } =
    useFormikContext<z.infer<typeof auths.loginSchema>>();

  const onSubmit = useCallback(async () => {
    try {
      await loginUser(values);
    } catch (err) {
      if (err instanceof AxiosError) {
        const statusCode = err.response?.status;

        if (statusCode === 404) {
          setFieldError('identifier', 'User not found');
        }
      }
    }
  }, [loginUser, values, setFieldError]);

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
      <Button title="Login" disabled={!_.isEmpty(errors)} onPress={onSubmit} />
    </KeyboardAvoidingView>
  );
};

const connector = connect(null, {
  loginUser: _loginUser,
});

type Props = ConnectedProps<typeof connector>;

export default connector(Credentials);
