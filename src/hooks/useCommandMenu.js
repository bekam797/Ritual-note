import { useState, useCallback } from 'react';

const useCommandMenu = () => {
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);

  const checkKeyForMenu = useCallback((event) => {
    if (event.key !== '/') {
      setIsCommandMenuOpen(false);
      return;
    }
    setIsCommandMenuOpen(true);
  }, []);

  return [isCommandMenuOpen, setIsCommandMenuOpen, checkKeyForMenu];
};

export default useCommandMenu;
