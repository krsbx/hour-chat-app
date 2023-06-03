import React from 'react';
import Credentials from './Credentials';
import Identity from './Identity';

const Step: React.FC<Props> = ({ step, nextStep, prevStep }) => {
  switch (step) {
    case 1:
      return <Identity nextStep={nextStep} />;

    case 2:
      return <Credentials prevStep={prevStep} />;

    default:
      return null;
  }
};

type Props = {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
};

export default Step;
