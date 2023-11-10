import React from 'react';
import '../login-page/LoginForm.css';
import IconButton from "../components/IconButton";
import {useNavigate} from "react-router-dom";
import {setUser, user} from "../App";
import User from "../data/User";

function SignupForm() {
    let navigate = useNavigate();

    let onSignup = () => {
        console.log("Signing up...");
        // Add a password requirement
        let name = document.getElementById("name").value;
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

    }

    return (
        <form className="dashboard-login" onSubmit={e => e.preventDefault()}>
            <input className="credentials-input" type="text" name="Name" id="name" placeholder="Name"
                   required/>
            <input className="credentials-input" type="text" name="Username" id="username" placeholder="Username"
                   required/>
            <input className="credentials-input" type="password" name="Password" id="password"
                   placeholder="Password" required/>
            <br/>
            <IconButton onClick={() => onSignup()} text="Signup"/>
        </form>
    );
}

export default SignupForm;