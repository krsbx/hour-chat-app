import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Video, { OnLoadData } from 'react-native-video';
import { Wrapper } from '..';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../constants/sizes';
import { COLOR_PALETTE } from '../../utils/theme';

const FileVideo: React.FC<Props> = ({
  item,
  onRequestClose,
  swipeToCloseEnabled,
}) => {
  const [isBuffering, setIsBuffering] = useState(true);
  const [_videoData, setVideoData] = useState<OnLoadData>({} as OnLoadData);

  return (
    <Wrapper.SwipeUpToClose
      onRequestClose={onRequestClose}
      swipeToCloseEnabled={swipeToCloseEnabled}
    >
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          width: WINDOW_WIDTH,
          height: WINDOW_HEIGHT,
          position: 'relative',
        }}
      >
        <Video
          onBuffer={(data) => setIsBuffering(data.isBuffering)}
          onLoad={(data) => setVideoData(data)}
          onError={(err) => console.log(err)}
          source={{
            uri: item.href,
          }}
          style={style.video}
        />
        {isBuffering && (
          <View style={style.bufferIndicator}>
            <ActivityIndicator size="large" color="#bbb" />
          </View>
        )}
      </View>
    </Wrapper.SwipeUpToClose>
  );
};

const style = StyleSheet.create({
  video: {
    width: WINDOW_WIDTH * 0.75,
    aspectRatio: 1 / 2,
  },
  bufferIndicator: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_PALETTE.BLACK,
  },
});

type Props = {
  onRequestClose?: () => void;
  swipeToCloseEnabled?: boolean;
  item: HourChat.Type.FileHref;
};

export default FileVideo;
