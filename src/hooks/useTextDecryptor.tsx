import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getEncryptor } from '../store/selectors/encryptor';
import { decryptText } from '../utils/chats/encryption';

const useMessageDecryptor = (text: string) => {
  const { config } = useSelector(getEncryptor);

  const message = useMemo(() => {
    if (!config || !config?.iv || !config?.key) return;
    if (!config?.iv?.length || !config?.key?.length) return;

    return decryptText(text, config);
  }, [text, config]);

  return message;
};

export default useMessageDecryptor;
