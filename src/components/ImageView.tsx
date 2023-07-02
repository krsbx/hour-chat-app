import { Text } from '@rneui/base';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import RNFS from 'react-native-fs';
import { connect, ConnectedProps } from 'react-redux';
import { Footer, Header, Wrapper } from '.';
import {
  MEDIA_ICON_MAP_WHITE,
  PREVIEWABLE_MEDIA_MIME,
} from '../constants/common';
import { AppState } from '../store';
import { getConfig } from '../store/selectors/config';
import { hasOwnProperty } from '../utils/common';
import { COLOR_PALETTE } from '../utils/theme';
import ImageViewing from './ImageViewing';

const ImageView: React.FC<Props> = ({
  files: _files,
  isVisible,
  fileIndex = 0,
  onRequestClose,
  onIndexChange,
  config,
}) => {
  const { uuid, type } = config;
  const downloadJobId = useRef<number | null>(null);
  const downloadRef = useRef<RNFS.DownloadResult | null>(null);
  const files = useMemo(() => {
    const files = _.isArray(_files) ? _files : [_files];

    return files.map((file) => {
      const clone: HourChat.Type.FileHref = {
        ...file,
        href: file.uri,
      };
      const type = (clone.type ?? '').split('/').shift?.() ?? '';

      switch (type) {
        case PREVIEWABLE_MEDIA_MIME.IMAGE:
          break;
        case PREVIEWABLE_MEDIA_MIME.AUDIO:
          clone.uri = MEDIA_ICON_MAP_WHITE.audio;
          break;
        case PREVIEWABLE_MEDIA_MIME.VIDEO:
          clone.uri = MEDIA_ICON_MAP_WHITE.video;
          break;
        default:
          clone.uri = MEDIA_ICON_MAP_WHITE.document;
          break;
      }

      return clone;
    });
  }, [_files]);
  const file = useMemo(() => files[fileIndex], [files, fileIndex]);
  const doubleTapToZoomEnabled = useMemo(() => {
    const type = (file?.type ?? '').split('/').shift?.() ?? '';

    return _.includes(PREVIEWABLE_MEDIA_MIME.IMAGE, type);
  }, [file]);

  const onDownload = useCallback(
    async (fileIndex: number) => {
      try {
        const dirPath = `${RNFS.DownloadDirectoryPath}/HourChat/${type}/${uuid}`;
        const isDirExist = await RNFS.exists(dirPath);
        const filePath = `${dirPath}/${files[fileIndex].name}`;
        const isFileExist = await RNFS.exists(filePath);

        if (!isDirExist) await RNFS.mkdir(dirPath);
        if (isFileExist) return;

        const { jobId, promise } = RNFS.downloadFile({
          fromUrl: files[fileIndex].href,
          toFile: filePath,
        });

        downloadJobId.current = jobId;
        downloadRef.current = await promise;
      } catch {
        // Do nothing if there is an error
      }
    },
    [files, type, uuid]
  );

  useEffect(() => {
    return () => {
      if (!downloadJobId.current) return;

      RNFS.stopDownload(downloadJobId.current);
    };
  }, []);

  return (
    <ImageViewing
      items={files}
      viewIndex={fileIndex}
      onIndexChange={onIndexChange}
      visible={isVisible}
      doubleTapToZoomEnabled={doubleTapToZoomEnabled}
      onRequestClose={onRequestClose}
      // eslint-disable-next-line react/no-unstable-nested-components
      HeaderComponent={({ fileIndex }) => (
        <Header.ImageView
          imageIndex={fileIndex}
          onDownload={onDownload}
          onRequestClose={onRequestClose}
        />
      )}
      // eslint-disable-next-line react/no-unstable-nested-components
      FooterComponent={({ fileIndex }) => (
        <Footer.ImageView imageIndex={fileIndex} text={files[fileIndex].name} />
      )}
      renderItem={({ item, onRequestClose, swipeToCloseEnabled }) => {
        let type = '';

        if (hasOwnProperty<string>(item, 'type'))
          type = (item?.type ?? '').split('/').shift?.() ?? '';

        switch (type) {
          case PREVIEWABLE_MEDIA_MIME.IMAGE:
            return null;

          case PREVIEWABLE_MEDIA_MIME.AUDIO:
            return (
              <Wrapper.SwipeUpToClose
                onRequestClose={onRequestClose}
                swipeToCloseEnabled={swipeToCloseEnabled}
              >
                <Text style={{ color: COLOR_PALETTE.WHITE }}>Text</Text>
              </Wrapper.SwipeUpToClose>
            );
          default:
            return null;
        }
      }}
      keyExtractor={(item, index) => `${item.toLocaleString()}-${index}`}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  config: getConfig(state),
});

const connector = connect(mapStateToProps);

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & {
  files: HourChat.Type.File | HourChat.Type.File[];
  fileIndex?: number;
  onIndexChange?: (fileIndex: number) => void;
  isVisible: boolean;
  onRequestClose: () => void;
};

export default connector(ImageView);
