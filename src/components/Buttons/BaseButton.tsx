import { Button, ButtonProps } from '@rneui/themed';
import React from 'react';

const BaseButton: React.FC<Props> = ({ ...props }) => {
  return <Button {...props} />;
};

type Props = ButtonProps;

export default BaseButton;
