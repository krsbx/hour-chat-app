import { ScreenWidth, Text } from '@rneui/base';
import { Overlay } from '@rneui/themed';
import { Formik } from 'formik';
import _ from 'lodash';
import React, { useCallback, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ModalProps,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { scale } from 'react-native-size-matters';
import { connect, ConnectedProps } from 'react-redux';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Buttons, Input } from '../../..';
import { FONT_SIZE } from '../../../../constants/fonts';
import { passwordSchema } from '../../../../schema/auth';
import { updateMyPassword as _updateMyPassword } from '../../../../store/actions/auth';
import STYLES from '../../../../styles';
import { flattenStyle } from '../../../../styles/factory';
import { COLOR_PALETTE, opacityColor } from '../../../../utils/theme';

const UpdatePassword: React.FC<Props> = ({
  isVisible,
  onClose,
  animationType = 'fade',
  backgroundColor = opacityColor('#000', 0.5),
  presentationStyle,
  updateMyPassword,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback(
    async (values: { password: string; confirmPassword: string }) => {
      try {
        Keyboard.dismiss();
        setIsSubmitting(true);

        await updateMyPassword(values);

        Toast.show('Password updated successfully!', Toast.SHORT);

        onClose();
      } catch {
        // Do nothing if there is an error
      } finally {
        setIsSubmitting(false);
      }
    },
    [updateMyPassword, onClose]
  );

  return (
    <Overlay
      isVisible={isVisible}
      presentationStyle={presentationStyle}
      animationType={animationType}
      onBackdropPress={onClose}
      onRequestClose={onClose}
      backdropStyle={{ backgroundColor }}
      supportedOrientations={['portrait']}
      hardwareAccelerated
      overlayStyle={{
        borderRadius: scale(10),
      }}
    >
      <Formik
        validationSchema={toFormikValidationSchema(passwordSchema)}
        initialValues={{ password: '', confirmPassword: '' }}
        onSubmit={onSubmit}
        validateOnMount
      >
        {({
          errors,
          touched,
          values,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <View
            style={{
              width: ScreenWidth * 0.75,
            }}
          >
            <KeyboardAvoidingView>
              <ScrollView
                contentContainerStyle={{
                  rowGap: scale(5),
                  alignItems: 'center',
                }}
              >
                <Text style={titleStyle}>Update Password</Text>
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
                <Input.InputField
                  isRequired
                  label={'Confirm Password'}
                  errorMessage={errors.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  isValid={touched.confirmPassword && !errors.confirmPassword}
                  isError={touched.confirmPassword && !!errors.confirmPassword}
                  value={values.confirmPassword}
                  placeholder={'Re-type your password'}
                  isPassword
                />
              </ScrollView>
              <View style={{ alignItems: 'center', rowGap: scale(10) }}>
                <Buttons.BaseButton
                  title={'Update'}
                  onPress={() => handleSubmit()}
                  disabled={!_.isEmpty(errors)}
                  loading={isSubmitting}
                />
                <TouchableOpacity
                  style={{ padding: scale(5) }}
                  onPress={onClose}
                >
                  <Text style={cancelStyle}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        )}
      </Formik>
    </Overlay>
  );
};

const titleStyle = flattenStyle({
  ...STYLES.LABELS.DEFAULT_TEXT,
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: scale(FONT_SIZE.EXTRA_SMALL),
  borderBottomWidth: 1,
  paddingBottom: scale(5),
  color: COLOR_PALETTE.NEUTRAL_90,
  borderBottomColor: COLOR_PALETTE.NEUTRAL_90,
});

const cancelStyle = flattenStyle({
  ...STYLES.LABELS.DEFAULT_TEXT,
  textAlign: 'center',
  borderBottomColor: COLOR_PALETTE.NEUTRAL_90,
  borderBottomWidth: 1,
});

const connector = connect(null, {
  updateMyPassword: _updateMyPassword,
});

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & {
  isVisible: boolean;
  onClose: () => void;
  backgroundColor?: string;
  presentationStyle?: ModalProps['presentationStyle'];
  animationType?: ModalProps['animationType'];
};

export default connector(UpdatePassword);
