import { useEffect, useRef } from 'react';

const usePrevious = <T,>(value: T) => {
  const prev = useRef<T>(value);

  useEffect(() => {
    prev.current = value;
  });

  return prev.current;
};

export default usePrevious;
