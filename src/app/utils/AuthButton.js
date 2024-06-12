'use client'
import { useState } from 'react';
import { useLogged } from '../context/LoggedContext';
import LoginModal from '../components/LoginModal';
import { getLoginData } from '../utils/getLoginData';

const AuthButton = ({ onClick, children }) => {
  
  const { logged } = useLogged();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (logged) {
      onClick();

      
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal ?
        <>
          <button onClick={handleClick}>{children}</button>
          <LoginModal onClose={handleCloseModal} />
        </>
        :
        <button onClick={handleClick}>{children}</button>
      }
    </>
  )
};

export default AuthButton;
