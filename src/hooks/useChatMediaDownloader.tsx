import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enqueuFile } from '../store/actions/queue';
import { getConfig } from '../store/selectors/config';

const useChatMediaDownloader = () => {
  const dispatch = useDispatch();
  const { uuid, type } = useSelector(getConfig);

  const onDownload = useCallback(
    (item: HourChat.Type.FileHref) =>
      enqueuFile({
        source: item,
        target: {
          uuid,
          type,
        },
      })(dispatch),
    [type, uuid, dispatch]
  );

  return onDownload;
};

export default useChatMediaDownloader;
