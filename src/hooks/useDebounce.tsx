import { useEffect } from 'react';
import useTimeout from './useTimeout';

const useDebounce = (
  callback: () => void,
  dependencies: unknown[],
  delay: number = 300
) => {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useDebounce;
