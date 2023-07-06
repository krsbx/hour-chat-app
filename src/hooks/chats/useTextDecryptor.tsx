import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentChat } from '../../store/selectors/currentChat';
import { decryptText } from '../../utils/chats/encryption';

const useTextDecryptor = (text: string) => {
  const { config } = useSelector(getCurrentChat);

  const message = useMemo(() => {
    if (!config || !config?.iv || !config?.key) return;
    if (!config?.iv?.length || !config?.key?.length) return;

    return decryptText(text, config);
  }, [text, config]);

  return message;
};

export default useTextDecryptor;
