import 'react-native-config';

declare module 'react-native-config' {
  interface NativeConfig {
    API_URL: string;
    CHAT_PATH: string;
    STORY_PATH: string;
  }
}
