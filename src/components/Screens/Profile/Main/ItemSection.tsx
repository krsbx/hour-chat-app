import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { connect, ConnectedProps } from 'react-redux';
import { Buttons, Label } from '../../..';
import {
  MAIN_TAB,
  PROFILE_STACK,
  STORY_TAB,
} from '../../../../constants/screens';
import { logoutUser as _logoutUser } from '../../../../store/actions/auth';
import { COLOR_PALETTE } from '../../../../utils/theme';

const ItemSection: React.FC<Props> = ({ logoutUser }) => {
  const navigation =
    useNavigation<
      HourChat.Navigation.ProfileStackNavigation<typeof PROFILE_STACK.MAIN>
    >();

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
    navigation.push(PROFILE_STACK.MY_CONNECTION);
  }, [navigation]);

  const navigateToSetting = useCallback(() => {
    navigation.push(PROFILE_STACK.SETTING);
  }, [navigation]);

  return (
    <ScrollView
      contentContainerStyle={{
        gap: scale(10),
        paddingVertical: scale(5),
        paddingHorizontal: scale(10),
        paddingBottom: scale(80),
      }}
      style={{
        marginBottom: scale(200),
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
  );
};

const connector = connect(null, {
  logoutUser: _logoutUser,
});

type Props = ConnectedProps<typeof connector>;

export default connector(ItemSection);
