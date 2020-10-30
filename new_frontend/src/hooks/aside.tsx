import React, { createContext, useCallback, useState, useContext } from 'react';

interface AsideContextData {
  show: boolean;
  toggle(): void;
}

const AsideContext = createContext<AsideContextData>({} as AsideContextData);

export const AsideProvider: React.FC = ({ children }) => {
  const [show, setShow] = useState(window.innerWidth >= 900);

  const toggle = useCallback(() => {
    setShow(!show);
  }, [show]);

  return (
    <AsideContext.Provider value={{ show, toggle }}>
      {children}
    </AsideContext.Provider>
  );
};

export const useAside = (): AsideContextData => {
  const context = useContext(AsideContext);

  if (!context) {
    throw new Error('useAside must be used within an AsideContext Provider');
  }

  return context;
};
