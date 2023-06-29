import { useMemo } from 'react';
import { decryptText } from '../utils/chats/encryption';

const useDecryptedChatMessage = (
  message: string,
  config: HourChat.Type.Encryption
) => {
  const messageBody = useMemo(() => {
    if (!message || !config || !config?.iv || !config?.key) return;
    if (!config?.iv?.length || !config?.key?.length) return;

    return decryptText(message, config);
  }, [message, config]);

  return messageBody;
};

export default useDecryptedChatMessage;
