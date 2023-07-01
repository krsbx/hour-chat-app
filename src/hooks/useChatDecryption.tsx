import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { getChatEncryption } from '../store/actions/encryptions';
import { getConfig } from '../store/selectors/config';
import useChatDecryptionPayload from './useChatDecryptionPayload';

const useChatDecryption = (dep: unknown[] = []) => {
  const dispatch = useDispatch<AppDispatch>();
  const config = useSelector(getConfig);
  const payload = useChatDecryptionPayload(config);

  useEffect(() => {
    getChatEncryption(payload)(dispatch).catch(() => {
      // Do nothing if there is an error
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, payload, ...dep]);
};

export default useChatDecryption;
