// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css'; // Import the CSS file

const Footer = () => {
  return (
    <div>
      <div className="container">        
      </div>
      <div className="copyrights">
      <p>
        &copy; {new Date().getFullYear()} Oppirif Chess Club. All Rights Reserved. | Developed by JugamSoft Technologies
      </p>
      </div>
    </div>
  );
};

export default Footer;
