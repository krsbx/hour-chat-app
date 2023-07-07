import _ from 'lodash';
import moment from 'moment';

type Metadata = HourChat.Chat.PrivateMetadata | HourChat.Chat.GroupMetadata;

export const isQueueTimestamp = (
  timestamp: Metadata['timestamp']
): timestamp is string | Date =>
  _.isString(timestamp) || timestamp instanceof Date;

export const timestampToMoment = (timestamp: Metadata['timestamp']) => {
  if (isQueueTimestamp(timestamp)) return moment(timestamp);

  return moment(timestamp.toDate());
};

export const isSameSender = (arg0: Metadata, arg1: Metadata) =>
  arg0.senderId === arg1.senderId;

export const isSameDate = (arg0: Metadata, arg1: Metadata) => {
  const firstDate = timestampToMoment(arg0.timestamp);
  const secondDate = timestampToMoment(arg1.timestamp);

  return moment(secondDate).isSame(firstDate, 'D');
};

export const sortMessage = (
  arg0: HourChat.Chat.ChatMessageHistory,
  arg1: HourChat.Chat.ChatMessageHistory
) => {
  const firstDate = timestampToMoment(arg0.timestamp);
  const secondDate = timestampToMoment(arg1.timestamp);

  return secondDate.isBefore(firstDate) ? 1 : -1;
};
