import { Text } from '@rneui/base';
import _ from 'lodash';
import moment from 'moment';
import React, { useCallback } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from 'react-redux';
import { Buttons, Header } from '../../components';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import { FONT_SIZE } from '../../constants/fonts';
import { CREATE_STORY_TAB } from '../../constants/screens';
import useCurrentUser from '../../hooks/useCurrentUser';
import { AppState } from '../../store';
import {
  getAttachedFile,
  getFileResolution,
  getTypedStory,
} from '../../store/selectors/story';
import STYLES from '../../styles';
import { COLOR_PALETTE } from '../../utils/theme';

const Preview: React.FC<Props> = ({ file, navigation, story }) => {
  const { fullName: currentUserFullName } = useCurrentUser();

  const navigateToEditor = useCallback(() => {
    if (navigation.canGoBack()) navigation.goBack();

    navigation.navigate(CREATE_STORY_TAB.FORM);
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: COLOR_PALETTE.WHITE }}>
      <FocusedStatusBar
        animated
        backgroundColor={COLOR_PALETTE.BLUE_10}
        barStyle={'light-content'}
      />
      <Header.Default />
      <View style={style.mainContainer}>
        <View style={style.cardContainer}>
          <View style={style.textContainer}>
            <View style={style.containerGap}>
              <View style={style.containerGap}>
                <Text style={STYLES.LABELS.DEFAULT_TEXT}>
                  {currentUserFullName}
                </Text>
                <Text
                  style={[
                    STYLES.LABELS.DEFAULT_TEXT,
                    { color: COLOR_PALETTE.NEUTRAL_70 },
                  ]}
                >
                  {moment().format('hh:mm A - Do MMMM YYYY')}
                </Text>
              </View>
            </View>
            {!_.isEmpty(story) && (
              <Text style={STYLES.LABELS.DEFAULT_TEXT}>{story}</Text>
            )}
          </View>
          {!_.isEmpty(file.uri) && (
            <Image
              source={{ uri: file.uri }}
              style={{
                width: '95%',
                aspectRatio: 1,
              }}
            />
          )}
          <View style={style.cardFooter}>
            <View style={{ flex: 1 }}>
              <Buttons.BaseButton
                title={'0'}
                icon={
                  <Ionicons
                    name={'heart'}
                    size={scale(FONT_SIZE.SMALL)}
                    color={COLOR_PALETTE.WHITE}
                    style={style.iconPadding}
                  />
                }
              />
            </View>
            <View style={{ flex: 1 }}>
              <Buttons.BaseButton
                title={'0'}
                icon={
                  <Ionicons
                    name={'heart-dislike'}
                    size={scale(FONT_SIZE.SMALL)}
                    color={COLOR_PALETTE.WHITE}
                    style={style.iconPadding}
                  />
                }
              />
            </View>
          </View>
        </View>
        <Buttons.BaseButton
          title={'Back to Edit'}
          icon={
            <Ionicons
              name={'pencil-outline'}
              size={scale(FONT_SIZE.SMALL)}
              color={COLOR_PALETTE.WHITE}
              style={style.iconPadding}
            />
          }
          onPress={navigateToEditor}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    padding: scale(5),
    gap: scale(5),
  },
  cardContainer: {
    borderWidth: 1.5,
    padding: scale(5),
    gap: scale(10),
    width: '100%',
    alignItems: 'center',
    borderColor: COLOR_PALETTE.NEUTRAL_40,
  },
  cardFooter: {
    flexDirection: 'row',
    gap: scale(5),
    width: '95%',
  },
  containerGap: {
    gap: scale(5),
  },
  textContainer: {
    width: '95%',
    gap: scale(10),
  },
  iconPadding: {
    paddingRight: scale(5),
  },
});

const mapStateToProps = (state: AppState) => ({
  file: getAttachedFile(state),
  resolution: getFileResolution(state),
  story: getTypedStory(state),
});

const connector = connect(mapStateToProps);

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps &
  HourChat.Navigation.CreateStoryProps<typeof CREATE_STORY_TAB.PREVIEW>;

export default connector(Preview);
