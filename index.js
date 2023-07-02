import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';
import { name as appName } from './app.json';
import App from './src/App';
import { trackPlayer } from './src/utils/services';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => trackPlayer.playbackService);
