import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enqueuFile } from '../../store/actions/queue';
import { getCurrentChat } from '../../store/selectors/currentChat';

const useMediaDownloader = () => {
  const dispatch = useDispatch();
  const { uuid, type } = useSelector(getCurrentChat);

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

export default useMediaDownloader;
