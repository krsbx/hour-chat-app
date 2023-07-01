import _ from 'lodash';
import moment from 'moment';
import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from 'react-redux';
import { Buttons, Card, Header } from '../../components';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import {
  CREATE_STORY_STACK,
  MAIN_TAB,
  STORY_TAB,
} from '../../constants/screens';
import useCurrentUser from '../../hooks/useCurrentUser';
import { AppState } from '../../store';
import { uploadFiles as _uploadFiles } from '../../store/actions/files';
import { createStory as _createStory } from '../../store/actions/stories';
import {
  getAttachedFile,
  getFileResolution,
  getTypedStory,
} from '../../store/selectors/story';
import STYLES from '../../styles';
import { COLOR_PALETTE } from '../../utils/theme';

const Preview: React.FC<Props> = ({
  file,
  navigation,
  resolution,
  story,
  createStory,
  uploadFiles,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isDisabled = useMemo(() => {
    if (_.isEmpty(story) && _.isEmpty(file)) return true;

    if (
      !_.isEmpty(file) &&
      file.type?.includes('images') &&
      (!resolution.width || !resolution.height) &&
      !_.trim(story).length
    )
      return true;

    return false;
  }, [story, file, resolution]);

  const { user: currentUser } = useCurrentUser();

  const navigateToEditor = useCallback(() => {
    if (navigation.canGoBack()) navigation.goBack();

    navigation.navigate(CREATE_STORY_STACK.FORM);
  }, [navigation]);

  const navigateToMyStory = useCallback(() => {
    navigation.navigate(MAIN_TAB.STORY, {
      screen: STORY_TAB.ME,
    });
  }, [navigation]);

  const onSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);

      let uri = '';

      if (file.uri) {
        const { data } = await uploadFiles(file as never);

        uri = data[0];
      }

      await createStory({
        body: story,
        ...(uri && {
          file: {
            uri: uri,
            height: resolution.height,
            width: resolution.width,
            type: file.type,
          },
        }),
      });

      navigateToMyStory();
    } catch (e) {
      // Do nothing if there is an error
    } finally {
      setIsSubmitting(false);
    }
  }, [
    file,
    createStory,
    story,
    resolution.height,
    resolution.width,
    navigateToMyStory,
    uploadFiles,
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: COLOR_PALETTE.WHITE }}>
      <FocusedStatusBar
        animated
        backgroundColor={COLOR_PALETTE.BLUE_10}
        barStyle={'light-content'}
      />
      <Header.Default />
      <View style={style.mainContainer}>
        <Card.Story
          likes={[]}
          dislikes={[]}
          createdAt={moment() as never}
          updatedAt={moment() as never}
          body={story}
          userId={currentUser.id}
          file={{
            uri: file.uri,
            height: resolution.height,
            width: resolution.width,
            type: file.type,
          }}
          mocked
        />
        <Buttons.BaseButton
          title={'Back to Edit'}
          icon={
            <Ionicons name={'pencil-outline'} {...STYLES.ICONS.DEFAULT_ICON} />
          }
          onPress={navigateToEditor}
          loading={isSubmitting}
        />
        <Buttons.BaseButton
          title={'Post Your Story'}
          icon={
            <Ionicons
              name={'send'}
              {...STYLES.ICONS.DEFAULT_ICON}
              color={
                isDisabled ? COLOR_PALETTE.NEUTRAL_50 : COLOR_PALETTE.WHITE
              }
            />
          }
          onPress={onSubmit}
          loading={isSubmitting}
          disabled={isDisabled}
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
});

const mapStateToProps = (state: AppState) => ({
  file: getAttachedFile(state),
  resolution: getFileResolution(state),
  story: getTypedStory(state),
});

const connector = connect(mapStateToProps, {
  createStory: _createStory,
  uploadFiles: _uploadFiles,
});

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps &
  HourChat.Navigation.CreateStoryStackProps<typeof CREATE_STORY_STACK.PREVIEW>;

export default connector(Preview);
