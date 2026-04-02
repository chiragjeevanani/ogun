import { useContext, createContext } from 'react';

export const DarkModeContext = createContext();

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    return { isDarkMode: false };
  }
  return context;
};
