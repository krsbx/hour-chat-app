import type { Timestamp } from '@firebase/firestore';
import moment from 'moment';
import { useMemo } from 'react';
import { isQueueTimestamp } from '../../utils/chats/common';

const format = 'HH:mm';

const useTimestamp = (timestamp: Timestamp | Date | string) => {
  const datetime = useMemo(() => {
    if (!timestamp) return '';

    if (isQueueTimestamp(timestamp)) return moment(timestamp).format(format);

    return moment(timestamp.toDate()).format(format);
  }, [timestamp]);

  return datetime;
};

export default useTimestamp;
