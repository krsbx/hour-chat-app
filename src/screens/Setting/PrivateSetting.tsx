import React from 'react';
import { ScrollView, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { connect, ConnectedProps } from 'react-redux';
import { Buttons, Input } from '../../components';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import { AppState } from '../../store';
import { getAuth } from '../../store/selectors/auth';
import { COLOR_PALETTE } from '../../utils/theme';

const PrivateSetting: React.FC<Props> = ({ auth }) => {
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
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: scale(10),
          paddingBottom: scale(80),
        }}
      >
        <Input.InputField
          isRequired
          label={'E-mail'}
          placeholder={'example@example.com'}
          value={auth.email}
          disabled
        />
        <Input.InputField
          isRequired
          label={'Username'}
          placeholder={'Your username'}
          value={auth.username}
          disabled
        />
        <Input.InputField
          isRequired
          label={'Phone Number'}
          placeholder={'Your phone number'}
          value={auth.phoneNumber}
          disabled
        />
      </ScrollView>
      <View style={{ rowGap: scale(5), alignItems: 'center' }}>
        <Buttons.BaseButton title={'Change Password'} />
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

export default connector(PrivateSetting);
