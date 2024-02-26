import React, { createContext, useState, useContext } from 'react';

const EmotionContext = createContext({
  emotion: '',
  changeEmotion: () => {}, // No recibe parámetros aquí
});

export function useEmotion() {
  const context = useContext(EmotionContext);
  if (!context) {
    throw new Error('useEmotion must be used within an EmotionProvider');
  }
  return context;
}

const EmotionProvider = ({ children }) => {
  const [emotion, setEmotion] = useState('');

  const changeEmotion = (newEmotion) => { 
    setEmotion(newEmotion);
  };

  return (
    <EmotionContext.Provider value={{ emotion, changeEmotion }}>
      {children}
    </EmotionContext.Provider>
  );
};

export { EmotionProvider };
