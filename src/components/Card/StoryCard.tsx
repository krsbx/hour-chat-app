import { Image, Text } from '@rneui/base';
import _ from 'lodash';
import moment from 'moment';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from 'react-redux';
import { Buttons } from '..';
import useCachedUserData from '../../hooks/useCachedUserData';
import {
  dislikeStory as _dislikeStory,
  likeStory as _likeStory,
} from '../../store/actions/stories';
import STYLES from '../../styles';
import { createFullName } from '../../utils/common';
import { COLOR_PALETTE } from '../../utils/theme';

const StoryCard: React.FC<Props> = ({
  timestamp,
  likes,
  dislikes,
  body,
  file,
  userId,
  mocked = false,
  uuid,
  dislikeStory,
  likeStory,
}) => {
  const { user } = useCachedUserData(userId);
  const fullName = useMemo(() => createFullName(user), [user]);

  const onPressOnLike = useCallback(() => {
    if (!uuid || mocked) return;

    likeStory(uuid);
  }, [uuid, mocked, likeStory]);

  const onPressOnDislike = useCallback(() => {
    if (!uuid || mocked) return;

    dislikeStory(uuid);
  }, [uuid, mocked, dislikeStory]);

  return (
    <View style={style.card}>
      <View style={style.header}>
        <Text style={STYLES.LABELS.DEFAULT_TEXT}>{fullName}</Text>
        <Text style={style.headerDateTime}>
          {moment(timestamp.toDate()).format('hh:mm A | Do MMMM YYYY')}
        </Text>
      </View>
      <View style={style.body}>
        {!_.isEmpty(body) && (
          <Text style={STYLES.LABELS.DEFAULT_TEXT}>{body}</Text>
        )}
        {!_.isEmpty(file?.uri) && (
          <Image
            source={{ uri: file?.uri }}
            style={{
              aspectRatio: 1,
            }}
          />
        )}
      </View>
      <View style={style.footer}>
        <View style={{ flex: 1 }}>
          <Buttons.BaseButton
            title={likes.length.toString()}
            icon={<Ionicons name={'heart'} {...STYLES.ICONS.DEFAULT_ICON} />}
            {...(_.includes(likes, user?.id) && {
              buttonStyle: { backgroundColor: COLOR_PALETTE.ROYAL_BLUE_100 },
            })}
            onPress={onPressOnLike}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Buttons.BaseButton
            title={dislikes.length.toString()}
            icon={
              <Ionicons name={'heart-dislike'} {...STYLES.ICONS.DEFAULT_ICON} />
            }
            {...(_.includes(dislikes, user?.id) && {
              buttonStyle: { backgroundColor: COLOR_PALETTE.ROYAL_BLUE_100 },
            })}
            onPress={onPressOnDislike}
          />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  card: {
    width: '100%',
    padding: scale(10),
    borderWidth: 1,
    borderRadius: scale(5),
    borderColor: COLOR_PALETTE.NEUTRAL_40,
    gap: scale(10),
  },
  header: {
    gap: scale(5),
  },
  headerDateTime: {
    ...STYLES.LABELS.DEFAULT_TEXT,
    color: COLOR_PALETTE.NEUTRAL_70,
  },
  body: {
    gap: scale(5),
  },
  footer: {
    flexDirection: 'row',
    gap: scale(5),
  },
});

const connector = connect(null, {
  likeStory: _likeStory,
  dislikeStory: _dislikeStory,
});

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps &
  HourChat.Story.Story & {
    mocked?: boolean;
    uuid?: string;
  };

export default connector(StoryCard);
