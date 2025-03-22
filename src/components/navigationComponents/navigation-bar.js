import React from 'react';
import RegistrationButton from '../buttonComponents/registration-button';
import PairingsButton from '../buttonComponents/pairings-button';
import HomeButton from '../buttonComponents/home-button';

import '../../styles/navigation-bar.css'; // Import the CSS file

const NavigationBar = () => {
  return (
    <div className="nav">
      <ul>
        <li className="nav-item">
          <HomeButton />
        </li>

        <li className="nav-item">
          <RegistrationButton />
        </li>

        {/* This is the component button to go to the match pairings page where players will be matched in between rounds */}
        {/* <li className="nav-item">
          <PairingsButton />
        </li> */}
      </ul>
    </div>
  );
};

export default NavigationBar;
