import React, { useEffect, useRef, useState } from 'react';

const DelayContainer: React.FC<Props> = ({ delay, children }) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!delay) {
      setIsLoading(false);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => {
      const ref = timeoutRef.current;

      if (!ref) return;

      clearTimeout(ref);
    };
  }, [delay]);

  if (isLoading) return null;

  return <React.Fragment>{children}</React.Fragment>;
};

type Props = {
  delay: number;
  children?: JSX.Element;
};

export default DelayContainer;
