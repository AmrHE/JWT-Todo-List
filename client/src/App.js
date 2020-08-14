import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

//Components
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import Facebook from './components/FacebookLogin';
import Google from './components/GoogleLogin';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };



  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });
      const parsedResponse = await response.json();
      parsedResponse === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    isAuth();
  });

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" render={props => !isAuthenticated ? <LandingPage {...props} /> : <Redirect to="/dashboard" />} />
            <Route exact path="/login" render={props => !isAuthenticated ? <Login {...props} setAuth={setAuth} /> : <Redirect to="/dashboard" />} />
            <Route exact path="/register" render={props => !isAuthenticated ? <Register {...props} setAuth={setAuth} /> : <Redirect to="/login" />} />
            <Route exact path="/facebook" render={props => !isAuthenticated ? <Facebook {...props} setAuth={setAuth} /> : <Redirect to="/dashboard" />} />
            <Route exact path="/google" render={props => !isAuthenticated ? <Google {...props} setAuth={setAuth} /> : <Redirect to="/dashboard" />} />
            <Route exact path="/dashboard" render={props => isAuthenticated ? <Dashboard {...props} setAuth={setAuth} /> : <Redirect to="/login" />} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
