import { Timestamp } from '@firebase/firestore';
import moment from 'moment';
import { useMemo } from 'react';

const useChatTimestamp = (timestamp: Timestamp) => {
  const datetime = useMemo(() => {
    if (!timestamp) return '';

    return moment(timestamp.toDate()).format('HH:mm');
  }, [timestamp]);

  return datetime;
};

export default useChatTimestamp;
