import _ from 'lodash';
import { useCallback, useEffect, useRef } from 'react';
import RNFS from 'react-native-fs';
import { useDispatch, useSelector } from 'react-redux';
import { dequeueFile } from '../store/actions/queue';
import { getFileQueue } from '../store/selectors/queue';
import usePrevious from './usePrevious';

const useChatMediaQueue = () => {
  const dispatch = useDispatch();
  const files = useSelector(getFileQueue);
  const prevFiles = usePrevious(files);
  const downloadJobId = useRef<number | null>(null);
  const downloadRef = useRef<RNFS.DownloadResult | null>(null);

  const handleDownloadQueue = useCallback(async () => {
    const { source, target } = files[0];
    const { type, uuid } = target;
    const fileName = source.name;
    const fileUri = source.href;

    try {
      const dirPath = `${RNFS.DownloadDirectoryPath}/HourChat/${type}/${uuid}`;
      const isDirExist = await RNFS.exists(dirPath);
      const filePath = `${dirPath}/${fileName}`;
      const isFileExist = await RNFS.exists(filePath);

      if (!isDirExist) await RNFS.mkdir(dirPath);
      if (isFileExist) return;

      const { jobId, promise } = RNFS.downloadFile({
        fromUrl: fileUri,
        toFile: filePath,
      });

      downloadJobId.current = jobId;
      downloadRef.current = await promise;
    } catch {
      // Do nothing if there is an error
    } finally {
      dequeueFile()(dispatch);
    }
  }, [files, dispatch]);

  useEffect(() => {
    return () => {
      if (!downloadJobId.current) return;

      RNFS.stopDownload(downloadJobId.current);
    };
  }, []);

  useEffect(() => {
    // Do nothing if there is no changes
    if (_.isEqual(files, prevFiles)) return;

    // Do nothing if there is no data in queue
    if (_.isEmpty(files)) return;

    handleDownloadQueue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);
};

export default useChatMediaQueue;
