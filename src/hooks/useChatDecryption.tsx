import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { getChatEncryption } from '../store/actions/encryptions';
import { getEncryptor } from '../store/selectors/encryptor';
import useChatDecryptionPayload from './useChatDecryptionPayload';

const useChatDecryption = (dep: unknown[] = []) => {
  const dispatch = useDispatch<AppDispatch>();
  const config = useSelector(getEncryptor);
  const payload = useChatDecryptionPayload(config);

  useEffect(() => {
    getChatEncryption(payload)(dispatch).catch(() => {
      // Do nothing if there is an error
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, payload, ...dep]);
};

export default useChatDecryption;
