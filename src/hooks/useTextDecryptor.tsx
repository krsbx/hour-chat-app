import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getConfig } from '../store/selectors/config';
import { decryptText } from '../utils/chats/encryption';

const useTextDecryptor = (text: string) => {
  const { config } = useSelector(getConfig);

  const message = useMemo(() => {
    if (!config || !config?.iv || !config?.key) return;
    if (!config?.iv?.length || !config?.key?.length) return;

    return decryptText(text, config);
  }, [text, config]);

  return message;
};

export default useTextDecryptor;
