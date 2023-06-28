import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHAT_STACK } from '../constants/screens';
import { AppDispatch } from '../store';
import { getChatEncryption } from '../store/actions/encryptions';
import { getCurrentEncryption } from '../store/selectors/encryption';
import useChatDecryptionPayload from './useChatDecryptionPayload';

const useChatDecryption = (params: Params, dep: unknown[] = []) => {
  const dispatch = useDispatch<AppDispatch>();
  const payload = useChatDecryptionPayload(params);
  const config = useSelector(getCurrentEncryption(params.type, params.uuid));

  useEffect(() => {
    getChatEncryption(payload)(dispatch).catch(() => {
      // Do nothing if there is an error
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, payload, ...dep]);

  return config;
};

type Params = HourChat.Navigation.ChatStackProps<
  typeof CHAT_STACK.VIEW
>['route']['params'];

export default useChatDecryption;
