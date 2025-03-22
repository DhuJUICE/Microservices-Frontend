import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/home-button.css';  // Import the CSS file

const HomeButton = () => {
  const navigate = useNavigate();

  const handleHomeOpen = async () => {
    navigate('/');
  };

  return (
    <a onClick={handleHomeOpen} className="home-button">
      Home
    </a>
  );
};

export default HomeButton;