import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RESOURCE_NAME } from '../constants/common';
import { getResourceById } from '../store/actions/resources';
import { getResurceDataById } from '../store/selectors/resources';
import { createFullName, isResourceExpired } from '../utils/common';

const useCachedUserData = (uuid: string | number) => {
  const _user = useSelector(getResurceDataById(RESOURCE_NAME.USERS, +uuid));
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [user, setUser] = useState<HourChat.Resource.User | undefined>(_user);
  const fullName = useMemo(() => {
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

  return {
    user,
    fullName,
  };
};

export default useCachedUserData;
