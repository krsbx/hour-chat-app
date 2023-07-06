import _ from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentChat } from '../../store/selectors/currentChat';
import { decryptText } from '../../utils/chats/encryption';

const useFileDecryptor = (file: HourChat.Type.File | HourChat.Type.File[]) => {
  const { config } = useSelector(getCurrentChat);

  const files = useMemo(() => {
    if (!config || !config?.iv || !config?.key) return [];
    if (!config?.iv?.length || !config?.key?.length) return [];

    const files = _.isArray(file) ? file : [file];

    return files.map((file) => ({
      ...file,
      uri: decryptText(file.uri, config) ?? '',
    }));
  }, [file, config]);

  return files;
};

export default useFileDecryptor;
