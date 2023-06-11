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

  return { user, fullName };
};

export default useCurrentUser;
