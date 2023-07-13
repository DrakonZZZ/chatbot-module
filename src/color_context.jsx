import { useContext, createContext } from 'react';

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const theme = {
    primaryColor: '#ED6A5A',
    secondaryColor: '#F4F1BB',
    textPrimaryColor: 'white',
    textSecondaryColor: 'black',
  };
  return (
    <ColorContext.Provider value={{ theme }}>{children}</ColorContext.Provider>
  );
};

export const useColorContext = () => {
  return useContext(ColorContext);
};
