import { StackActions, useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/base';
import { useFormikContext } from 'formik';
import _ from 'lodash';
import React, { useCallback, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { connect, ConnectedProps } from 'react-redux';
import { z } from 'zod';
import { Buttons, Inputs } from '../..';
import { AUTH_STACK, MAIN_STACK, MAIN_TAB } from '../../../constants/screens';
import { auths } from '../../../schema';
import {
  requestEmailOtp as _requestEmailOtp,
  verifyEmail as _verifyEmail,
} from '../../../store/actions/auth';
import STYLES from '../../../styles';

const Credentials: React.FC<Props> = ({ requestEmailOtp, verifyEmail }) => {
  const navigation =
    useNavigation<
      HourChat.Navigation.AuthStackNavigation<typeof AUTH_STACK.OTP>
    >();
  const { values, handleChange, errors } =
    useFormikContext<z.infer<typeof auths.otpSchema>>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      Keyboard.dismiss();
      setIsSubmitting(true);

      await verifyEmail(values);

      navigation.dispatch(
        StackActions.replace(MAIN_STACK.MAIN, {
          screen: MAIN_TAB.CHAT,
        })
      );
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  }, [values, verifyEmail, navigation]);

  const onResend = useCallback(async () => {
    try {
      Keyboard.dismiss();
      setIsSubmitting(true);

      await requestEmailOtp();
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  }, [setIsSubmitting, requestEmailOtp]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        gap: scale(25),
      }}
    >
      <View style={{ justifyContent: 'center' }}>
        <Inputs.OtpField
          value={values.code}
          onChangeText={handleChange('code')}
          maxLength={6}
        />
        <View
          style={{
            alignItems: 'center',
            paddingVertical: scale(5),
          }}
        >
          <Text style={STYLES.LABELS.DEFAULT_TEXT}>
            The OTP Code are sent to registered email address
          </Text>
          <Text style={STYLES.LABELS.DEFAULT_TEXT}>
            Please check your email inbox or even in the spam folder
          </Text>
        </View>
      </View>
      <View style={{ gap: scale(10) }}>
        <Buttons.BaseButton
          title={'Verify'}
          disabled={!_.isEmpty(errors)}
          loading={isSubmitting}
          onPress={onSubmit}
        />
        <Buttons.BaseButton
          title={'Resend'}
          loading={isSubmitting}
          onPress={onResend}
        />
      </View>
    </View>
  );
};

const connector = connect(null, {
  requestEmailOtp: _requestEmailOtp,
  verifyEmail: _verifyEmail,
});

type Props = ConnectedProps<typeof connector>;

export default connector(Credentials);
