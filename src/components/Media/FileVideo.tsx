import { Slider } from '@rneui/themed';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Video, { OnLoadData, OnProgressData } from 'react-native-video';
import { Wrapper } from '..';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../constants/sizes';
import { COLOR_PALETTE } from '../../utils/theme';

const FileVideo: React.FC<Props> = ({
  item,
  onRequestClose,
  swipeToCloseEnabled,
}) => {
  const playerRef = useRef<Video | null>(null);
  const [progressData, setProgressData] = useState<OnProgressData>();
  const [isPaused, setIsPaused] = useState(true);
  const [isEnded, setIsEnded] = useState(false);

  const position = useMemo(
    () => progressData?.currentTime ?? 0,
    [progressData?.currentTime]
  );
  const duration = useMemo(
    () => progressData?.playableDuration ?? 0,
    [progressData?.playableDuration]
  );
  const progress = useMemo(() => {
    if (duration <= 0) return 0;

    return position / duration;
  }, [position, duration]);

  const onSeek = useCallback(
    (value: number) => {
      if (!duration) return 0;

      const seekTime = duration * value;
      playerRef.current?.seek?.(seekTime);
    },
    [duration]
  );

  const onLoad = useCallback(
    (data: OnLoadData) =>
      setProgressData({
        currentTime: data.currentTime,
        playableDuration: data.duration,
        seekableDuration: data.duration,
      }),
    [setProgressData]
  );

  const onEnd = useCallback(() => {
    setIsEnded(true);
    setIsPaused(true);
  }, [setIsEnded]);

  const onPressOnAction = useCallback(() => {
    setIsPaused((curr) => !curr);

    if (isEnded) setIsEnded(false);
  }, [setIsEnded, setIsPaused, isEnded]);

  return (
    <Wrapper.SwipeUpToClose
      onRequestClose={onRequestClose}
      swipeToCloseEnabled={swipeToCloseEnabled}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: WINDOW_WIDTH,
          height: WINDOW_HEIGHT,
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <Video
            source={{
              uri: item.href,
            }}
            onLoad={onLoad}
            onEnd={onEnd}
            onProgress={setProgressData}
            repeat={false}
            progressUpdateInterval={1}
            ref={playerRef}
            paused={isPaused}
            style={style.video}
            controls={false}
            fullscreen={false}
          />
          <TouchableOpacity
            onPress={onPressOnAction}
            style={{ position: 'absolute', zIndex: 9999 }}
          >
            <FontAwesome5
              name={isPaused ? 'play' : 'pause'}
              size={scale(26)}
              color={COLOR_PALETTE.WHITE}
            />
          </TouchableOpacity>
        </View>
        <Slider
          minimumValue={0}
          value={progress}
          onValueChange={onSeek}
          maximumValue={1}
          allowTouchTrack
          thumbStyle={{
            height: scale(20),
            width: scale(20),
          }}
          style={{ width: '75%' }}
          minimumTrackTintColor={COLOR_PALETTE.WHITE}
          thumbTintColor={COLOR_PALETTE.WHITE}
          maximumTrackTintColor={COLOR_PALETTE.BLUE_10}
        />
      </View>
    </Wrapper.SwipeUpToClose>
  );
};

const style = StyleSheet.create({
  video: {
    width: '75%',
    aspectRatio: 2 / 1,
  },
});

type Props = {
  onRequestClose?: () => void;
  swipeToCloseEnabled?: boolean;
  item: HourChat.Type.FileHref;
};

export default FileVideo;
