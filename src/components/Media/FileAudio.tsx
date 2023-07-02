// import Slider from '@react-native-community/slider';
import { Slider } from '@rneui/themed';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import TrackPlayer, {
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import { State as PlaybackState } from 'react-native-track-player/lib/interfaces';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Wrapper } from '..';
import {
  addTracks,
  clearTrack,
  setupPlayer,
} from '../../utils/services/track-player';
import { COLOR_PALETTE } from '../../utils/theme';

const FileAudio: React.FC<Props> = ({
  onRequestClose,
  swipeToCloseEnabled,
  item,
}) => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const { position, duration } = useProgress();
  const playbackState = usePlaybackState();

  const progressValue = useMemo(() => {
    return (position || 0) / duration || 0 || 0;
  }, [position, duration]);

  const setupTrackPlayer = useCallback(async () => {
    try {
      const isSetup = await setupPlayer();

      const queue = await TrackPlayer.getQueue();
      if (isSetup) {
        if (queue.length > 0) await clearTrack();

        const audio = item as HourChat.Type.FileHref;

        await addTracks({
          url: audio.href,
        });
      }

      setIsPlayerReady(isSetup);
    } catch {
      // Do nothing if there is an error
    }
  }, [item]);

  const onAudioSeek = useCallback(
    (value: number) => {
      if (!isPlayerReady) return;

      const requestedPost = value * duration;

      TrackPlayer.seekTo(requestedPost).catch(() => {
        // Do nothing if there is an error
      });
    },
    [isPlayerReady, duration]
  );

  const onChangeState = useCallback(async () => {
    if (!isPlayerReady) return;

    try {
      switch (playbackState) {
        case PlaybackState.Playing: {
          TrackPlayer.pause();
          break;
        }

        case PlaybackState.Stopped: {
          if (position >= 1) {
            await setupTrackPlayer();
          }
          await TrackPlayer.play();
          break;
        }

        default: {
          TrackPlayer.play();
          break;
        }
      }
    } catch {
      // Do nothing if there is an error
    }
  }, [isPlayerReady, playbackState, position, setupTrackPlayer]);

  useEffect(() => {
    setupTrackPlayer();
  }, [setupTrackPlayer]);

  useEffect(() => {
    return () => {
      if (!isPlayerReady) return;

      TrackPlayer.reset().catch(() => {
        // Do nothing if there is an error
      });
    };
  }, [isPlayerReady]);

  return (
    <Wrapper.SwipeUpToClose
      onRequestClose={onRequestClose}
      swipeToCloseEnabled={swipeToCloseEnabled}
    >
      {!isPlayerReady ? (
        <ActivityIndicator size="large" color="#bbb" />
      ) : (
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            gap: scale(10),
          }}
        >
          <TouchableOpacity onPress={onChangeState}>
            <FontAwesome5
              name={playbackState === PlaybackState.Playing ? 'pause' : 'play'}
              size={scale(26)}
              color={COLOR_PALETTE.WHITE}
            />
          </TouchableOpacity>
          <Slider
            minimumValue={0}
            value={progressValue}
            onValueChange={onAudioSeek}
            maximumValue={1}
            allowTouchTrack
            thumbStyle={{
              height: scale(20),
              width: scale(20),
            }}
            style={{ width: '75%', height: scale(25) }}
            minimumTrackTintColor={COLOR_PALETTE.WHITE}
            thumbTintColor={COLOR_PALETTE.WHITE}
            maximumTrackTintColor={COLOR_PALETTE.BLUE_10}
          />
        </View>
      )}
    </Wrapper.SwipeUpToClose>
  );
};

type Props = {
  onRequestClose?: () => void;
  swipeToCloseEnabled?: boolean;
  item: HourChat.Type.ImageSource;
};

export default FileAudio;
