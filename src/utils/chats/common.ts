import moment from 'moment';

type Metadata = HourChat.Chat.PrivateMetadata | HourChat.Chat.GroupMetadata;

export const isSameSender = (arg0: Metadata, arg1: Metadata) =>
  +arg0.senderId === +arg1.senderId;

export const isSameDate = (arg0: Metadata, arg1: Metadata) => {
  const firstDate = moment(arg0.timestamp.toDate());
  const secondDate = moment(arg1.timestamp.toDate());

  return moment(secondDate).isSame(firstDate, 'D');
};

export const sortMessage = (
  a: HourChat.Chat.ChatMessageHistory,
  b: HourChat.Chat.ChatMessageHistory
) => b.timestamp.toMillis() - a.timestamp.toMillis();
