import React from 'react';
import SideNavBar from '../components/SideNavBar';
import NavBar from '../components/NavBar';

const Home = () => {
    return (
        <div className="home">
            <NavBar />
            <SideNavBar />
            <h1>Home</h1>
        </div>
    );
};

export default Home;