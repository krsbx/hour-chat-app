import { Avatar, AvatarProps } from '@rneui/themed';
import _ from 'lodash';
import React, { useMemo } from 'react';
import { scale } from 'react-native-size-matters';
import { flattenStyle } from '../../styles/factory';
import { COLOR_PALETTE, opacityColor } from '../../utils/theme';

const DefaultAvatar: React.FC<Props> = ({ user, name, noUser, ...props }) => {
  const alias = useMemo(() => {
    const names = name?.split(/ /g);

    return _.compact((names ?? []).map((name) => name[0])).join('');
  }, [name]);
  const avatarProps = useMemo(() => {
    if (noUser || !user || !user.avatar) return {};

    return {
      source: {
        uri: user.avatar,
      },
    };
  }, [noUser, user]);

  return (
    <Avatar
      containerStyle={containerStyle}
      title={alias}
      size={scale(40)}
      rounded
      {...avatarProps}
      {...props}
    />
  );
};

const containerStyle = flattenStyle({
  backgroundColor: COLOR_PALETTE.BLUE_30,
  borderColor: opacityColor(COLOR_PALETTE.WHITE, 0.3),
  borderWidth: scale(2),
});

type Props = AvatarProps & {
  user?: HourChat.Resource.User;
  name?: string;
  noUser?: boolean;
};

export default DefaultAvatar;
