import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/registration-button.css';  // Import the CSS file

const RegistrationButton = () => {
  const navigate = useNavigate();

  const handleMenuOpen = async () => {
    navigate('/registration');
  };

  return (
    <a onClick={handleMenuOpen} className="registration-button">
      Register Here
    </a>
  );
};

export default RegistrationButton;