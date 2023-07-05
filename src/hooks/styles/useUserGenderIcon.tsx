import { useMemo } from 'react';
import { GENDER } from '../../constants/resources';
import { COLOR_PALETTE } from '../../utils/theme';

const useUserGenderIcon = (user: HourChat.Resource.User) => {
  const iconName = useMemo(() => {
    switch (user.gender) {
      case GENDER.MALE:
        return 'male';

      case GENDER.FEMALE:
        return 'female';

      default:
        return 'male-female';
    }
  }, [user]);

  const iconColor = useMemo(() => {
    switch (user.gender) {
      case GENDER.MALE:
        return COLOR_PALETTE.BLUE_10;

      case GENDER.FEMALE:
        return COLOR_PALETTE.DANGER_PRESSED;

      default:
        return COLOR_PALETTE.ROYAL_BLUE_100;
    }
  }, [user]);

  return {
    iconColor,
    iconName,
  };
};

export default useUserGenderIcon;
