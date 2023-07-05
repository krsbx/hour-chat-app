import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { setConfig } from '../../store/actions/config';
import { getChatEncryption } from '../../store/actions/encryptions';
import useChatEncryptionPayload from './useChatEncryptionPayload';

const useChatEncryptionRetrieval = (dep: unknown[] = []) => {
  const dispatch = useDispatch<AppDispatch>();
  const payload = useChatEncryptionPayload();

  useEffect(() => {
    getChatEncryption(payload)(dispatch)
      .then(({ data: config }) => {
        setConfig({
          config,
        })(dispatch);
      })
      .catch(() => {
        // Do nothing if there is an error
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, payload, ...dep]);
};

export default useChatEncryptionRetrieval;