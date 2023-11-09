import React from 'react';
import './NewBox.css';
import LoginForm from './LoginForm.js';
import IconButton from "../components/IconButton";
import {useNavigate} from "react-router-dom";

function Login() {

    let navigate = useNavigate(); // For redirections

    return (
        <div className="app">
            <div className='dashboard-login vertical-tiled'>
                <h1>Welcome to GittyUp</h1>
                <LoginForm/>
            </div>
            <br/>
            <IconButton onClick={() => navigate('/signup')} text="Signup"/>
        </div>
    );
}

export default Login;