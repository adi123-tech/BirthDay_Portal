import React, { createContext, useContext } from 'react';

const ApiContext = createContext('https://birthday-portal.onrender.com/');

export const ApiProvider = ({ children }) => {
  const baseUrl = 'https://birthday-portal.onrender.com/';

  return (
    <ApiContext.Provider value={baseUrl}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
