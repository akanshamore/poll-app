import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Poll App</h1>
            <div className="button-container">
                <Link to="/register">
                    <button className="home-button">Register</button>
                </Link>
                <Link to="/login">
                    <button className="home-button">Login</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;