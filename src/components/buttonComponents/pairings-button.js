import React from 'react';
import { useNavigate } from 'react-router-dom';

const PairingsButton = () => {
  const navigate = useNavigate();

  const handlePairingsOpen = async () => {
    navigate('/pairings');
  };

  return (
    <a onClick={handlePairingsOpen} style={{ cursor: 'pointer' }}>
      Match Pairings
    </a>
  );
};

export default PairingsButton;
