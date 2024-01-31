'use client'
import { useState } from 'react';
import { useLogged } from '../context/LoggedContext';
import LoginModal from '../components/LoginModal';



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
    <div>
      {showModal ?
        <>
          <button onClick={handleClick}>{children}</button>
          <LoginModal onClose={handleCloseModal} />
        </>
        :
        <button onClick={handleClick}>{children}</button>
      }
    </div>
  )
};

export default AuthButton;
