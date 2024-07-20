import React, { createContext, useContext } from 'react';

const ApiContext = createContext('http://localhost:5000/');

export const ApiProvider = ({ children }) => {
  const baseUrl = 'http://localhost:5000/';

  return (
    <ApiContext.Provider value={baseUrl}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
