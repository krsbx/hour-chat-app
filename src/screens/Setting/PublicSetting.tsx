import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { connect, ConnectedProps } from 'react-redux';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import { Profile } from '../../components/Screens';
import { createIdentityValue } from '../../constants/defaults';
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
        initialValues={createIdentityValue(auth)}
        onSubmit={console.log}
        validationSchema={toFormikValidationSchema(auths.identitySchema)}
        validateOnMount
      >
        <Profile.Setting.Identity />
      </Formik>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: getAuth(state),
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(PublicSetting);
