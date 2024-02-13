'use client'
import React, { createContext, useState, useContext } from 'react';

const LoggedContext = createContext({
  logged: false,
  changeLogged: () => {},
});

export function useLogged() {
  const context = useContext(LoggedContext);
  if (!context) {
    throw new Error('useLogged must be used within an LoggedProvider');
  }
  return context;
}

const LoggedProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);

  const changeLogged = (newLogged) => { 
    setLogged(newLogged);
  };

  return (
    <LoggedContext.Provider value={{ logged, changeLogged }}>
      {children}
    </LoggedContext.Provider>
  );
};

export { LoggedProvider };