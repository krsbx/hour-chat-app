import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Track,
} from 'react-native-track-player';

export const setupPlayer = async () => {
  let isSetup = false;
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [],
      notificationCapabilities: [],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  } finally {
    return isSetup;
  }
};

export const addTracks = async (track: Track | Track[]) => {
  await TrackPlayer.add(track);
  await TrackPlayer.setRepeatMode(RepeatMode.Off);
};

export const clearTrack = async () => {
  await TrackPlayer.removeUpcomingTracks();
};

export const playbackService = async () => {};
