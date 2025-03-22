// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../navigationComponents/navigation-bar';

const Header = ({ cartCount }) => {
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const toggleUserMenu = () => setUserMenuVisible((prev) => !prev);

  return (
    <div>
      <header>
        <div className="main-bar">
          <Link to="/">
            <div className="title">
              <h1>
                Oppirif Chess Club
              </h1>
            </div>
          </Link>
        </div>
        <NavigationBar/>
      </header>
    </div>
  );
};

export default Header;
