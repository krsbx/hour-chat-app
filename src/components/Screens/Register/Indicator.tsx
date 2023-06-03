import React from 'react';
import { View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { flattenStyle } from '../../../styles/factory';
import * as Indicators from './Indicators';

const Indicator: React.FC<Props> = ({ step, maxStep, width }) => {
  return (
    <View style={containerStyle}>
      <Indicators.Circle isActive={step >= 1} step={1} />
      <Indicators.Bar
        progress={Math.floor((step / maxStep) * 100)}
        width={width}
      />
      <Indicators.Circle isActive={step >= 2} step={2} />
    </View>
  );
};

const containerStyle = flattenStyle({
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: scale(10),
  justifyContent: 'center',
});

type Props = {
  step: number;
  maxStep: number;
  width: number;
};

export default Indicator;
