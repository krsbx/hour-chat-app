import { ScreenWidth, Text } from '@rneui/base';
import { Overlay } from '@rneui/themed';
import { Formik } from 'formik';
import _ from 'lodash';
import React, { useCallback, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ModalProps,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { scale } from 'react-native-size-matters';
import { connect, ConnectedProps } from 'react-redux';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Buttons, Input } from '../../..';
import { FONT_SIZE } from '../../../../constants/fonts';
import { deleteAccountSchema } from '../../../../schema/auth';
import { deleteMyAccount as _deleteMyAccount } from '../../../../store/actions/auth';
import STYLES from '../../../../styles';
import { flattenStyle } from '../../../../styles/factory';
import { COLOR_PALETTE, opacityColor } from '../../../../utils/theme';

const UpdatePassword: React.FC<Props> = ({
  isVisible,
  onClose,
  animationType = 'fade',
  backgroundColor = opacityColor('#000', 0.5),
  presentationStyle,
  deleteMyAccount,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback(
    async (values: { password: string }) => {
      try {
        Keyboard.dismiss();
        setIsSubmitting(true);

        await deleteMyAccount(values);
        Toast.show('Account deleted successfully!', Toast.SHORT);

        onClose();
      } catch {
        // Do nothing if there is an error
      } finally {
        setIsSubmitting(false);
      }
    },
    [onClose, deleteMyAccount]
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
        validationSchema={toFormikValidationSchema(deleteAccountSchema)}
        initialValues={{ password: '' }}
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
          <KeyboardAvoidingView>
            <View
              style={{
                width: ScreenWidth * 0.75,
              }}
            >
              <View style={{ alignItems: 'center', rowGap: scale(10) }}>
                <Text style={titleStyle}>Delete My Account</Text>

                <Text style={disclaimerStyle}>
                  Are you sure want to delete your whole account? You'll lose
                  all your information from this account and the access to this
                  account.
                </Text>
                <Text style={disclaimerStyle}>
                  If you're sure, confirm by typing your password below.
                </Text>

                <Input.InputField
                  errorMessage={errors.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  isValid={touched.password && !errors.password}
                  isError={touched.password && !!errors.password}
                  value={values.password}
                  placeholder={'Your password'}
                  isPassword
                />

                <Buttons.BaseButton
                  buttonStyle={{ backgroundColor: COLOR_PALETTE.DANGER_MAIN }}
                  title={'Delete My Account'}
                  onPress={() => handleSubmit()}
                  disabled={!_.isEmpty(errors)}
                  loading={isSubmitting}
                />
                <TouchableOpacity
                  style={{ padding: scale(5) }}
                  onPress={onClose}
                >
                  <Text style={cancelStyle}>Nevermind</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
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
  color: COLOR_PALETTE.DANGER_MAIN,
  borderBottomColor: COLOR_PALETTE.DANGER_MAIN,
});

const disclaimerStyle = flattenStyle({
  ...STYLES.LABELS.DEFAULT_TEXT,
  color: COLOR_PALETTE.DANGER_MAIN,
  textAlign: 'center',
});

const cancelStyle = flattenStyle({
  ...STYLES.LABELS.DEFAULT_TEXT,
  textAlign: 'center',
  borderBottomColor: COLOR_PALETTE.NEUTRAL_90,
  borderBottomWidth: 1,
});

const connector = connect(null, {
  deleteMyAccount: _deleteMyAccount,
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
