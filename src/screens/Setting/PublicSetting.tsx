import { Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { connect, ConnectedProps } from 'react-redux';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Buttons, Input } from '../../components';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import { UserAvatar } from '../../components/Screens/Setting';
import { GENDERS } from '../../constants/resources';
import { auths } from '../../schema';
import { AppState } from '../../store';
import { getAuth } from '../../store/selectors/auth';
import { COLOR_PALETTE } from '../../utils/theme';

const PublicSetting: React.FC<Props> = ({ auth }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLOR_PALETTE.WHITE,
        paddingBottom: scale(70),
      }}
    >
      <FocusedStatusBar
        animated
        backgroundColor={COLOR_PALETTE.BLUE_10}
        barStyle={'light-content'}
      />
      <Formik
        initialValues={_.defaults(
          _.pick(auth, [
            'firstName',
            'middleName',
            'lastName',
            'dob',
            'gender',
            'avatar',
          ]),
          {
            middleName: '',
            lastName: '',
            avatar: '',
          }
        )}
        onSubmit={console.log}
        validationSchema={toFormikValidationSchema(auths.identitySchema)}
        validateOnMount
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          setFieldTouched,
        }) => (
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <UserAvatar user={values as never} />
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
              <Input.Dropdown<(typeof GENDERS)[number]>
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
          </KeyboardAvoidingView>
        )}
      </Formik>
      <View style={{ rowGap: scale(5), alignItems: 'center' }}>
        <Buttons.BaseButton title={'Update My Data'} />
      </View>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: getAuth(state),
});

const connector = connect(mapStateToProps);

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps;

export default connector(PublicSetting);
