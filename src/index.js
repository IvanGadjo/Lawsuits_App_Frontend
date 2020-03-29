import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import LogIn from "./components/authentication/logIn";
import RegisterNewUser from "./components/authentication/registerNewUser";

ReactDOM.render(

    <Router>
        <Redirect from={'/'} to={'/login'}/>

        <Route path={'/home'} exact component={App}/>
        <Route path={'/login'} component={LogIn}/>
        <Route path={'/register'} component={RegisterNewUser}/>
    </Router>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
