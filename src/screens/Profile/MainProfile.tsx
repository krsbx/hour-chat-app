import { Text } from '@rneui/base';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from 'react-redux';
import { Buttons, Header, Label } from '../../components';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import { FONT_SIZE } from '../../constants/fonts';
import { MAIN_TAB, PROFILE_STACK, STORY_TAB } from '../../constants/screens';
import useCurrentUser from '../../hooks/useCurrentUser';
import useUserGenderIcon from '../../hooks/useUserGenderIcon';
import { logoutUser as _logoutUser } from '../../store/actions/auth';
import STYLES from '../../styles';
import { COLOR_PALETTE } from '../../utils/theme';

const MainProfile: React.FC<Props> = ({ navigation, logoutUser }) => {
  const { fullName, user: currentUser } = useCurrentUser();
  const { iconColor, iconName } = useUserGenderIcon(currentUser);

  const navigateToMyStory = useCallback(() => {
    navigation.navigate(MAIN_TAB.STORY, {
      screen: STORY_TAB.ME,
    });
  }, [navigation]);

  const navigateToAroundMeStory = useCallback(() => {
    navigation.navigate(MAIN_TAB.STORY, {
      screen: STORY_TAB.USERS,
    });
  }, [navigation]);

  const navigateToNearMe = useCallback(() => {
    navigation.navigate(MAIN_TAB.NEAR_ME);
  }, [navigation]);

  const navigateToFriendList = useCallback(() => {
    navigation.push(PROFILE_STACK.FRIEND_LIST);
  }, [navigation]);

  const navigateToSetting = useCallback(() => {
    navigation.push(PROFILE_STACK.SETTING);
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLOR_PALETTE.WHITE,
      }}
    >
      <FocusedStatusBar
        animated
        backgroundColor={COLOR_PALETTE.BLUE_10}
        barStyle={'light-content'}
      />
      <Header.Default noBottomLine />
      <View
        style={{
          gap: scale(5),
        }}
      >
        <View style={style.userContainer}>
          <Text style={style.fullName}>{fullName}</Text>
          <View style={style.gender}>
            <Ionicons name={iconName} size={scale(18)} color={iconColor} />
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            gap: scale(10),
            paddingVertical: scale(5),
            paddingHorizontal: scale(10),
          }}
        >
          <View>
            <Label.SectionLabel>Connect</Label.SectionLabel>
            <Buttons.Section onPress={navigateToNearMe} title={'Near Me'} />
            <Buttons.Section
              onPress={navigateToFriendList}
              title={'My Connection'}
            />
          </View>
          <View>
            <Label.SectionLabel>Stories</Label.SectionLabel>
            <Buttons.Section onPress={navigateToMyStory} title={'My Stories'} />
            <Buttons.Section
              onPress={navigateToAroundMeStory}
              title={'Around Me'}
            />
          </View>
          <View>
            <Label.SectionLabel>Misc</Label.SectionLabel>
            <Buttons.Section onPress={navigateToSetting} title={'Setting'} />
            <Buttons.Section
              style={{ backgroundColor: COLOR_PALETTE.NEUTRAL_20 }}
              onPress={navigateToSetting}
              title={'Membership'}
              disabled
            />
            <Buttons.Section onPress={logoutUser} title="Logout" />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    gap: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_PALETTE.BLUE_10,
    padding: scale(5),
    borderBottomWidth: 1,
    borderBottomColor: COLOR_PALETTE.NEUTRAL_40,
  },
  fullName: {
    ...STYLES.LABELS.DEFAULT_TEXT,
    fontSize: scale(FONT_SIZE.MEDIUM),
    color: COLOR_PALETTE.WHITE,
  },
  gender: {
    width: scale(30),
    height: scale(30),
    padding: scale(5),
    backgroundColor: COLOR_PALETTE.NEUTRAL_20,
    borderRadius: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const connector = connect(null, {
  logoutUser: _logoutUser,
});

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps &
  HourChat.Navigation.ProfileStackProps<typeof PROFILE_STACK.MAIN>;

export default connector(MainProfile);
