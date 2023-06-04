import _ from 'lodash';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import CodeContainer from './CodeContainer';

const OtpField: React.FC<Props> = ({ value, maxLength, ...props }) => {
  const inputRef = useRef<TextInput>();
  const [isFocus, setIsFocus] = useState(false);
  const boxArray = useMemo(() => new Array(maxLength).fill(''), [maxLength]);

  const onPress = useCallback(() => {
    inputRef.current?.focus?.();
    setIsFocus(true);
  }, [inputRef, setIsFocus]);

  const onBlur = useCallback(() => {
    setIsFocus(false);
  }, [setIsFocus]);

  return (
    <View style={{ gap: scale(10) }}>
      <View
        style={{
          columnGap: scale(10),
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        {_.map(boxArray, (val, index) => (
          <CodeContainer
            key={index}
            value={value?.[index]}
            length={value?.length}
            maxLength={maxLength}
            index={index}
            isFocus={isFocus}
            onPress={onPress}
          />
        ))}
      </View>
      <TextInput
        style={{ position: 'absolute', opacity: 0, zIndex: -999 }}
        keyboardType={'number-pad'}
        value={value}
        maxLength={maxLength}
        onBlur={onBlur}
        {...props}
        ref={inputRef as never}
      />
    </View>
  );
};

type Props = Omit<TextInputProps, 'keyboardType' | 'value' | 'maxLength'> & {
  value: string;
  maxLength: number;
};

export default OtpField;
