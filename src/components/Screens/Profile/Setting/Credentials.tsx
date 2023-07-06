import { useFormikContext } from 'formik';
import _ from 'lodash';
import React, { useCallback, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import Toast from 'react-native-simple-toast';
import { scale } from 'react-native-size-matters';
import { connect, ConnectedProps } from 'react-redux';
import { Buttons, Input } from '../../..';
import { createCredentialValue } from '../../../../constants/defaults';
import { AppState } from '../../../../store';
import { updateMyData as _updateMyData } from '../../../../store/actions/auth';
import { getAuth } from '../../../../store/selectors/auth';
import { onUpdateMyData } from '../../../../utils/errors/auth';
import { COLOR_PALETTE } from '../../../../utils/theme';
import DeleteAccount from './DeleteAccount';
import UpdatePassword from './UpdatePassword';
import UserAvatar from './UserAvatar';

const Credentials: React.FC<Props> = ({ auth, updateMyData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const { errors, handleChange, handleBlur, setFieldError, touched, values } =
    useFormikContext<ReturnType<typeof createCredentialValue>>();

  const toggleDeleteModal = useCallback(
    () => setIsDeleteVisible((curr) => !curr),
    [setIsDeleteVisible]
  );
  const togglePasswordModal = useCallback(
    () => setIsPasswordVisible((curr) => !curr),
    [setIsPasswordVisible]
  );

  const onSubmit = useCallback(async () => {
    try {
      Keyboard.dismiss();
      setIsSubmitting(true);

      await updateMyData(values);

      Toast.show('Account updated successfully!', Toast.SHORT);
    } catch (error) {
      onUpdateMyData(error, setFieldError);
    } finally {
      setIsSubmitting(false);
    }
  }, [setFieldError, updateMyData, values]);

  return (
    <React.Fragment>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <UserAvatar user={auth} />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            padding: scale(10),
          }}
        >
          <Input.InputField
            isRequired
            label={'E-mail'}
            placeholder={'example@example.com'}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            isValid={touched?.email && !errors?.email}
            isError={touched?.email && !!errors?.email}
            errorMessage={errors?.email}
          />
          <Input.InputField
            isRequired
            label={'Username'}
            placeholder={'Your username'}
            value={values.username}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            isValid={touched?.username && !errors?.username}
            isError={touched?.username && !!errors?.username}
            errorMessage={errors?.username}
          />
          <Input.InputField
            isRequired
            label={'Phone Number'}
            placeholder={'Your phone number'}
            value={values.phoneNumber}
            onChangeText={handleChange('phoneNumber')}
            onBlur={handleBlur('phoneNumber')}
            isValid={touched?.phoneNumber && !errors?.phoneNumber}
            isError={touched?.phoneNumber && !!errors?.phoneNumber}
            errorMessage={errors?.phoneNumber}
          />
        </ScrollView>
        <View style={{ rowGap: scale(5), alignItems: 'center' }}>
          <Buttons.BaseButton
            buttonStyle={{ backgroundColor: COLOR_PALETTE.DANGER_MAIN }}
            title={'Delete My Account'}
            onPress={toggleDeleteModal}
          />
          <Buttons.BaseButton
            title={'Change Password'}
            onPress={togglePasswordModal}
          />
          <Buttons.BaseButton
            title={'Update My Data'}
            onPress={onSubmit}
            disabled={!_.isEmpty(errors)}
            loading={isSubmitting}
          />
        </View>
      </KeyboardAvoidingView>
      <UpdatePassword
        isVisible={isPasswordVisible}
        onClose={togglePasswordModal}
      />
      <DeleteAccount isVisible={isDeleteVisible} onClose={toggleDeleteModal} />
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: getAuth(state),
});

const connector = connect(mapStateToProps, {
  updateMyData: _updateMyData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(Credentials);
