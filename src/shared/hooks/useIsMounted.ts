import { useEffect, useState } from 'react';

const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return isMounted;
};

export default useIsMounted;
