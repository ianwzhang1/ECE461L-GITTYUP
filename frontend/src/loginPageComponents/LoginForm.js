import React from 'react';
import './Login.css';
import {Link, Navigate, useNavigate} from "react-router-dom"
import IconButton from "../components/IconButton";

//import Box from './Box';
// import './box.css';
//import {postData} from "../App.js"

const url = "http://ec2-13-59-237-43.us-east-2.compute.amazonaws.com:5000/"
// const url = 'http://127.0.0.1:5000/'

async function postData(path, data) {
    const response = await fetch(url + path, {
        method: "POST", headers: {
            "Content-Type": "application/json", "Accept": "plain/text"
        }, body: JSON.stringify(data)
    });
    return response.text()//.json();
}

function LoginForm() {
    let navigate = useNavigate();

    let onLogin = () => {
        console.log("Logging in...");
        navigate('/projects');
    }

    return (
        <form className="dashboard-login" onSubmit={e => e.preventDefault()}>
            <input className="credentials-input" type="text" name="Username" id="Username" placeholder="Username"
                   required/>
            <input className="credentials-input" type="password" name="Password" id="Password"
                   placeholder="Password" required/>
            <br/>
            <IconButton onClick={() => onLogin()} text="Login"/>
        </form>
    );
}

export default LoginForm;
