import { useFormikContext } from 'formik';
import _ from 'lodash';
import React, { useMemo } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { z } from 'zod';
import { Buttons, Input } from '../..';
import { GENDERS } from '../../../constants/resources';
import { auths } from '../../../schema';

const Identity: React.FC<Props> = ({ nextStep }) => {
  const { errors, handleChange, handleBlur, setFieldTouched, touched, values } =
    useFormikContext<z.infer<typeof auths.registerSchema>>();
  const isDisabled = useMemo(() => !_.isEmpty(errors.step1), [errors.step1]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Input.InputField
          isRequired
          label={'First Name'}
          errorMessage={errors.step1?.firstName}
          onChangeText={handleChange('step1.firstName')}
          onBlur={handleBlur('step1.firstName')}
          isValid={touched.step1?.firstName && !errors.step1?.firstName}
          isError={touched.step1?.firstName && !!errors.step1?.firstName}
          placeholder={'Your firstname'}
          value={values.step1.firstName}
        />
        <Input.InputField
          label={'Middle Name'}
          errorMessage={errors.step1?.middleName}
          onChangeText={handleChange('step1.middleName')}
          onBlur={handleBlur('step1.middleName')}
          placeholder={'Your middleName'}
          value={values.step1.middleName}
        />
        <Input.InputField
          label={'Last Name'}
          errorMessage={errors.step1?.lastName}
          onChangeText={handleChange('step1.lastName')}
          onBlur={handleBlur('step1.lastName')}
          placeholder={'Your lastName'}
          value={values.step1.lastName}
        />
        <Input.DateTimePicker
          onConfirm={(date) => handleChange('step1.dob')(date.toISOString())}
          value={values.step1.dob}
          placeholder={'dd/mm/yyyy'}
          mode={'date'}
          onBlur={() => setFieldTouched('step1.dob')}
          isValid={touched.step1?.dob && !errors.step1?.dob}
          isError={touched.step1?.dob && !!errors.step1?.dob}
          errorMessage={errors.step1?.dob}
          label={'Date of Birth'}
        />
        <Input.Dropdown
          data={GENDERS}
          labelField={'label'}
          valueField={'value'}
          label={'Gender'}
          onChange={({ value }) => handleChange('step1.gender')(value)}
          placeholder={'Your gender'}
          value={values.step1.gender}
        />
      </ScrollView>
      <View style={{ alignItems: 'center' }}>
        <Buttons.BaseButton
          title={'Next'}
          onPress={nextStep}
          disabled={isDisabled}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

type Props = {
  nextStep: () => void;
};

export default Identity;
