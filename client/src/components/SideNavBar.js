import React from 'react';
import { NavLink } from 'react-router-dom';

const SideNavBar = () => {
    return (
        <div className="left-navbar">
            <nav className="icons">
                <NavLink>
                    <img src="./img/icons/home.svg" alt="Home Icon" />
                </NavLink>
                <NavLink>
                    <img src="./img/icons/profil.svg" alt="Profil Icon" />
                </NavLink>
            </nav>
        </div>
    );
};

export default SideNavBar;