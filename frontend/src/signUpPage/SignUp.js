import React from 'react';
import './SignUp.css';
import {Link, useNavigate} from "react-router-dom"
import LoginForm from "../loginPageComponents/LoginForm";
import IconButton from "../components/IconButton";
import SignupForm from "./SignupForm";


function SignUp() {
    let navigate = useNavigate(); // For redirections

    return (
        <div className="app">
            <div className='dashboard-login vertical-tiled'>
                <h1>Welcome to GittyUp</h1>
                <SignupForm/>
            </div>
            <br/>
            <IconButton onClick={() => navigate('/')} text="Back to Login"/>
        </div>
    );
}

export default SignUp;
