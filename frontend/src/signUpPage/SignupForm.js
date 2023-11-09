import React from 'react';
import './SignUpBox.css';
import SignUp from './SignUp';
import IconButton from "../components/IconButton";
import {useNavigate} from "react-router-dom";

function SignupForm() {
    let navigate = useNavigate();

    let onSignup = () => {
        console.log("Signing up...");
        // Add a password requirement
        navigate('/projects');
    }

    return (
        <form className="dashboard-login" onSubmit={e => e.preventDefault()}>
            <input className="credentials-input" type="text" name="Username" id="Username" placeholder="Username"
                   required/>
            <input className="credentials-input" type="password" name="Password" id="Password"
                   placeholder="Password" required/>
            <br/>
            <IconButton onClick={() => onSignup()} text="Signup"/>
        </form>
    );
}

export default SignupForm;