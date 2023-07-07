import { useSelector } from 'react-redux';
import { getCurrentChat } from '../../store/selectors/currentChat';
import { getCurrentMessageQueue } from '../../store/selectors/queue';

const useQueuedMessage = () => {
  const { type, uuid } = useSelector(getCurrentChat);
  const messageQueue = useSelector(getCurrentMessageQueue({ type, uuid }));

  return messageQueue;
};

export default useQueuedMessage;
