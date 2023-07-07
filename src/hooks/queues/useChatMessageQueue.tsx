import _ from 'lodash';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHAT_TYPE } from '../../constants/common';
import {
  sendGroupMessage,
  sendPrivateMessage,
} from '../../store/actions/chats';
import { uploadFiles } from '../../store/actions/files';
import { dequeueMessage, enqueuFailedMessage } from '../../store/actions/queue';
import { getMessageQueue } from '../../store/selectors/queue';
import usePrevious from '../common/usePrevious';

const useChatMessageQueue = () => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessageQueue);
  const prevMessages = usePrevious(messages);

  const handleMessageQueue = useCallback(async () => {
    const message = messages[0];
    const files: HourChat.Type.File[] = [];

    try {
      if (!_.isEmpty(message.files)) {
        const { data } = await uploadFiles(message.files)();

        files.push(
          ..._.map(data, (uri, id) => ({
            ...message.files[id],
            uri,
          }))
        );
      }

      switch (message.type) {
        case CHAT_TYPE.GROUP:
          await sendGroupMessage({
            uuid: message.uuid,
            body: message.body,
            files,
          })();
          break;
        case CHAT_TYPE.PRIVATE:
          await sendPrivateMessage({
            receiverId: message.uuid,
            body: message.body,
            files,
          })();
          break;
      }
    } catch {
      enqueuFailedMessage(message)(dispatch);
    } finally {
      dequeueMessage()(dispatch);
    }
  }, [messages, dispatch]);

  useEffect(() => {
    // Do nothing if there is no changes
    if (_.isEqual(messages, prevMessages)) return;

    // Do nothing if there is no data in queue
    if (_.isEmpty(messages)) return;

    handleMessageQueue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);
};

export default useChatMessageQueue;
