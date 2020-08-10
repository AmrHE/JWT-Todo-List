import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="jumbotron text-center">
            <h1>Welcome to To-Do City</h1>
            <p>Start using our app and manage your daily tasks</p>
            <Link to="/login" className="btn btn-primary btn-lg">Login</Link>
            <Link to="/register" className="btn btn-primary btn-lg ml-3">Register</Link>

        </div>
    )
}

export default LandingPage;