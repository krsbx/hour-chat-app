import _ from 'lodash';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHAT_TYPE } from '../constants/common';
import { sendGroupMessage, sendPrivateMessage } from '../store/actions/chats';
import { uploadFiles } from '../store/actions/files';
import { dequeueMessage } from '../store/actions/messageQueue';
import { getMessageQueue } from '../store/selectors/messageQueue';
import usePrevious from './usePrevious';

const useChatMessageQueue = () => {
  const dispatch = useDispatch();
  const { queue } = useSelector(getMessageQueue);
  const prevQueue = usePrevious(queue);

  const handleMessageQueue = useCallback(async () => {
    const message = queue[0];
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
    } catch (e) {
      // Do nothing if there is an error
    } finally {
      dequeueMessage()(dispatch);
    }
  }, [queue, dispatch]);

  useEffect(() => {
    // Do nothing if there is no changes
    if (_.isEqual(queue, prevQueue)) return;

    // Do nothing if there is no data in queue
    if (_.isEmpty(queue)) return;

    handleMessageQueue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue]);
};

export default useChatMessageQueue;
