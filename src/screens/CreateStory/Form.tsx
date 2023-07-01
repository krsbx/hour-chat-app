import React, { useCallback, useMemo } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { scale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from 'react-redux';
import { Buttons, Header, Input } from '../../components';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import { CREATE_STORY_STACK } from '../../constants/screens';
import useImageStoryResolution from '../../hooks/useImageStoryResolution';
import { AppState } from '../../store';
import {
  deleteFile as _deleteFile,
  deleteResolution as _deleteResolution,
  setFile as _setFile,
  setResolution as _setResolution,
  setStory as _setStory,
} from '../../store/actions/story';
import {
  getAttachedFile,
  getFileResolution,
  getTypedStory,
} from '../../store/selectors/story';
import STYLES from '../../styles';
import { COLOR_PALETTE, opacityColor } from '../../utils/theme';

const Form: React.FC<Props> = ({
  navigation,
  deleteFile,
  deleteResolution,
  file,
  setFile,
  setResolution,
  setStory,
  resolution,
  story,
}) => {
  const onAttachFile = useCallback(async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        copyTo: 'cachesDirectory',
      });

      if (!result.fileCopyUri) return;

      const extension = result.name?.split('.').pop();

      switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
          Image.getSize(
            result.uri,
            (width, height) => {
              setResolution({
                width,
                height,
              });
            },
            () => {}
          );
          break;

        case 'mp4':
          break;

        default: {
          return;
        }
      }

      setFile(result);
    } catch {
      // Do nothing if there is an error
    }
  }, [setResolution, setFile]);

  const onPressOnRemoveAttachment = useCallback(() => {
    deleteFile();
    deleteResolution();
  }, [deleteFile, deleteResolution]);

  const onPressOnPreview = useCallback(() => {
    navigation.navigate(CREATE_STORY_STACK.PREVIEW);
  }, [navigation]);

  const imageResolution = useImageStoryResolution(resolution);
  const normalizedResolution = useMemo(
    () => ({
      ...imageResolution,
      width: imageResolution.width - scale(15),
    }),
    [imageResolution]
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLOR_PALETTE.WHITE }}>
      <FocusedStatusBar
        animated
        backgroundColor={COLOR_PALETTE.BLUE_10}
        barStyle={'light-content'}
      />
      <Header.Default />
      <ScrollView>
        <View style={{ padding: scale(5), gap: scale(5) }}>
          <Input.InputField
            multiline
            label={'Your story'}
            placeholder={'Type your story'}
            value={story}
            onChangeText={setStory}
            style={style.inputStyle}
          />
          <Buttons.BaseButton
            title={'Attach Image'}
            onPress={onAttachFile}
            icon={<Ionicons name={'image'} {...STYLES.ICONS.DEFAULT_ICON} />}
          />
          {!!file.uri && (
            <View style={{ position: 'relative', alignItems: 'center' }}>
              <Image
                source={{
                  uri: file.uri,
                }}
                style={normalizedResolution}
              />
              <TouchableOpacity
                onPress={onPressOnRemoveAttachment}
                style={style.removeIcon}
              >
                <Entypo
                  name="circle-with-cross"
                  color={opacityColor(COLOR_PALETTE.WHITE, 0.5)}
                  size={scale(20)}
                />
              </TouchableOpacity>
            </View>
          )}
          <Buttons.BaseButton
            title={'Preview'}
            onPress={onPressOnPreview}
            icon={<Ionicons name={'eye'} {...STYLES.ICONS.DEFAULT_ICON} />}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  inputStyle: {
    minHeight: scale(100),
    verticalAlign: 'top',
  },
  removeIcon: {
    position: 'absolute',
    top: scale(5),
    right: scale(5),
  },
});

const mapStateToProps = (state: AppState) => ({
  file: getAttachedFile(state),
  resolution: getFileResolution(state),
  story: getTypedStory(state),
});

const connector = connect(mapStateToProps, {
  setResolution: _setResolution,
  deleteResolution: _deleteResolution,
  setStory: _setStory,
  setFile: _setFile,
  deleteFile: _deleteFile,
});

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps &
  HourChat.Navigation.CreateStoryStackProps<typeof CREATE_STORY_STACK.FORM>;

export default connector(Form);
