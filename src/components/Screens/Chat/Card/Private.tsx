import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { CHAT_TYPE, RESOURCE_NAME } from '../../../../constants/common';
import { getResourceById } from '../../../../store/actions/resources';
import { getResurceDataById } from '../../../../store/selectors/resources';
import { createFullName, isResourceExpired } from '../../../../utils/common';
import Message from './Message';

const Private: React.FC<Props> = ({ uuid, body, timestamp }) => {
  const _user = useSelector(getResurceDataById(RESOURCE_NAME.USERS, +uuid));
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [user, setUser] = useState<HourChat.Resource.User | undefined>(_user);
  const name = useMemo(() => {
    if (!user) return '';

    return createFullName(user);
  }, [user]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    if (!uuid) return;

    if (user && !isResourceExpired(user)) return;

    getResourceById(RESOURCE_NAME.USERS, uuid)()
      .then(setUser)
      .catch(() => {
        // Do nothing if there is an error
      });
  }, [uuid, user, isFirstRender]);

  if (!user) return null;

  return (
    <Message
      name={name}
      body={body}
      timestamp={timestamp}
      type={CHAT_TYPE.PRIVATE}
      uuid={uuid}
    />
  );
};

type Props = HourChat.Chat.PrivateMetadata;

export default Private;
