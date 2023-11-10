import React, {useEffect} from 'react';
import '../login-page/Login.css';
import {Link, useNavigate} from "react-router-dom"
import IconButton from "../components/IconButton";
import SignupForm from "./SignupForm";
import PageTitle from "../components/PageTitle";
import {current_user} from "../backendLinker/BackendLink";

/**
 * Signup page reuses login page's styling
 */
function Signup() {
    let navigate = useNavigate(); // For redirections

    return (
        <div className="app">
            <div className="header">
                <PageTitle icon="fa fa-clipboard" text="Signup"/>
            </div>
            <div className='dashboard-login vertical-tiled shadow-box'>
                <h1>Welcome to GittyUp</h1>
                <SignupForm/>
                <IconButton onClick={() => navigate('/')} text="Back to Login"/>
            </div>
            <br/>
        </div>
    );
}

export default Signup;
