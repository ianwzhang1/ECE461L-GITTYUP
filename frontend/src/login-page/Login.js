import React from 'react';
import './LoginForm.css';
import LoginForm from './LoginForm.js';
import IconButton from "../components/IconButton";
import {useNavigate} from "react-router-dom";
import PageTitle from "../components/PageTitle";

function Login() {

    let navigate = useNavigate(); // For redirections

    return (
        <div className="app">
            <div className="header">
                <PageTitle icon="fa fa-key" text="Login"/>
            </div>
            <div className="dashboard-login vertical-tiled shadow-box">
                <h1>Welcome to GittyUp</h1>
                <LoginForm/>
                <IconButton onClick={() => navigate('/signup')} text="New User"/>
            </div>
            <br/>
        </div>
    );
}

export default Login;