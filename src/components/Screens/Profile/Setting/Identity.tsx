import { useFormikContext } from 'formik';
import _ from 'lodash';
import React, { useCallback, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';
import { scale } from 'react-native-size-matters';
import { connect, ConnectedProps } from 'react-redux';
import { Buttons, Input } from '../../..';
import { createIdentityValue } from '../../../../constants/defaults';
import { GENDERS } from '../../../../constants/resources';
import { AppState } from '../../../../store';
import { updateMyData as _updateMyData } from '../../../../store/actions/auth';
import { uploadFiles as _uploadFiles } from '../../../../store/actions/files';
import { getAuth } from '../../../../store/selectors/auth';
import UserAvatar from './UserAvatar';

const Identity: React.FC<Props> = ({ auth, updateMyData, uploadFiles }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatar, setAvatar] = useState<HourChat.Type.File>({
    name: '',
    uri: '',
    type: '',
  });
  const {
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    touched,
    values,
  } = useFormikContext<ReturnType<typeof createIdentityValue>>();

  const onPressOnAvatar = useCallback(async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });

      setFieldValue('avatar', result.uri);
      setAvatar(_.pick(result, ['name', 'uri', 'type']) as never);
    } catch {
      // Do nothing if there is an error
    }
  }, [setFieldValue, setAvatar]);

  const onSubmit = useCallback(async () => {
    try {
      Keyboard.dismiss();
      setIsSubmitting(true);

      const isShouldUpload = auth.avatar !== values.avatar;

      if (isShouldUpload) {
        const { data } = await uploadFiles(avatar);

        values.avatar = data[0];
      }

      await updateMyData(values);

      Toast.show('Account updated successfully!', Toast.SHORT);
    } catch {
      // Do nothing if there is an error
    } finally {
      setIsSubmitting(false);
    }
  }, [auth.avatar, avatar, updateMyData, uploadFiles, values]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <UserAvatar user={values as never} onPressOnAvatar={onPressOnAvatar} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: scale(10),
        }}
      >
        <Input.InputField
          isRequired
          label={'First Name'}
          placeholder={'Your firstname'}
          value={values.firstName}
          onChangeText={handleChange('firstName')}
          onBlur={handleBlur('firstName')}
          isValid={touched?.firstName && !errors?.firstName}
          isError={touched?.firstName && !!errors?.firstName}
          errorMessage={errors?.firstName}
        />
        <Input.InputField
          label={'Middle Name'}
          placeholder={'Your middleName'}
          value={values.middleName}
          onChangeText={handleChange('middleName')}
          onBlur={handleBlur('middleName')}
          isValid={touched?.middleName && !errors?.middleName}
          isError={touched?.middleName && !!errors?.middleName}
          errorMessage={errors?.middleName}
        />
        <Input.InputField
          label={'Last Name'}
          placeholder={'Your lastName'}
          value={values.lastName}
          onChangeText={handleChange('lastName')}
          onBlur={handleBlur('lastName')}
          isValid={touched?.lastName && !errors?.lastName}
          isError={touched?.lastName && !!errors?.lastName}
          errorMessage={errors?.lastName}
        />
        <Input.DateTimePicker
          label={'Date of Birth'}
          placeholder={'dd/mm/yyyy'}
          mode={'date'}
          value={values.dob}
          onBlur={() => setFieldTouched('dob')}
          onConfirm={(date) => handleChange('dob')(date.toISOString())}
          isValid={touched?.dob && !errors?.dob}
          isError={touched?.dob && !!errors?.dob}
          errorMessage={errors?.dob}
        />
        <Input.Dropdown
          data={GENDERS}
          labelField={'label'}
          valueField={'value'}
          label={'Gender'}
          placeholder={'Your gender'}
          value={values.gender}
          onChange={({ value }) => handleChange('gender')(value)}
          onBlur={() => setFieldTouched('gender')}
          isValid={touched?.gender && !errors?.gender}
          isError={touched?.gender && !!errors?.gender}
          errorMessage={errors?.gender}
        />
      </ScrollView>
      <View style={{ rowGap: scale(5), alignItems: 'center' }}>
        <Buttons.BaseButton
          title={'Update My Data'}
          onPress={onSubmit}
          disabled={!_.isEmpty(errors)}
          loading={isSubmitting}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: getAuth(state),
});

const connector = connect(mapStateToProps, {
  updateMyData: _updateMyData,
  uploadFiles: _uploadFiles,
});

type Props = ConnectedProps<typeof connector>;

export default connector(Identity);
