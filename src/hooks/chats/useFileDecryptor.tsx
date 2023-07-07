import _ from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentChat } from '../../store/selectors/currentChat';
import { decryptText } from '../../utils/chats/encryption';

const useFileDecryptor = (
  file: HourChat.Type.File | HourChat.Type.File[],
  fromQueue?: boolean
) => {
  const { config } = useSelector(getCurrentChat);

  const files = useMemo(() => {
    const files = _.isArray(file) ? file : [file];

    if (fromQueue) return files;

    if (!config || !config?.iv || !config?.key) return [];
    if (!config?.iv?.length || !config?.key?.length) return [];

    return files.map((file) => ({
      ...file,
      uri: decryptText(file.uri, config) ?? '',
    }));
  }, [file, fromQueue, config]);

  return files;
};

export default useFileDecryptor;
