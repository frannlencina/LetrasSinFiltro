// LoggedContext.js
import React, { createContext, useState, useContext } from 'react';

const LoggedContext = createContext({
  logged: null,
  changeLogged: () => {}, // No recibe parámetros aquí
});

export function useLogged() {
  const context = useContext(LoggedContext);
  if (!context) {
    throw new Error('useLogged must be used within an LoggedProvider');
  }
  return context;
}

const LoggedProvider = ({ children }) => {
  const [logged, setLogged] = useState(null);

  const changeLogged = (newLogged) => { 
    console.log(newLogged)
    setLogged(newLogged);
  };

  return (
    <LoggedContext.Provider value={{ logged, changeLogged }}>
      {children}
    </LoggedContext.Provider>
  );
};

export { LoggedProvider };
