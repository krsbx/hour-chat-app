import _ from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from '../store/selectors/auth';
import { createFullName } from '../utils/common';

const useCurrentUser = () => {
  const user = useSelector(getAuth);
  const fullName = useMemo(() => {
    if (!user) return '';

    return createFullName(user);
  }, [user]);
  const alias = useMemo(() => {
    const names = fullName.split(/ /g);

    return _.compact(names.map((name) => name?.[0])).join('');
  }, [fullName]);

  return { user, fullName, alias };
};

export default useCurrentUser;
