import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="navbar">
            <nav>
                <div className="logo">
                    <NavLink exact to="/">
                        <img src="./img/logo.png" alt="logo" />
                        <h3>Sowail</h3>
                    </NavLink>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;