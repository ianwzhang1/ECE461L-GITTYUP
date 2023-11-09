import React from 'react';
import './Login.css';
import {Link, Navigate, useNavigate} from "react-router-dom"
import IconButton from "../components/IconButton";

//import Box from './Box';
// import './box.css';
//import {postData} from "../App.js"

const url = "http://ec2-13-59-237-43.us-east-2.compute.amazonaws.com:5000/"
// const url = 'http://127.0.0.1:5000/'

// npm install react-router-dom@5 run this to install router

async function postData(path, data) {
    const response = await fetch(url + path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "plain/text"
        },
        body: JSON.stringify(data)
    });
    return response.text()//.json();
}


function onLogin() {
    console.log("notPoop");
    postData("user/login",
        {
            "usr": "iwzhang",
            "pwd": "123456"
        }).then((data) => {
        console.log(data)
    })

    //find out how to get data from forms
}

function LoginForm() {

    let navigate = useNavigate(); // For redirections

    return (
        <div className="dashboard-login">
            <h1>Welcome to GittyUp</h1>
            <form className="dashboard-login" onSubmit={e => e.preventDefault()}>
                <input className="credentials-input" type="text" name="Username" id="Username" placeholder="Username"
                       required/>
                <input className="credentials-input" type="password" name="Password" id="Password"
                       placeholder="Password" required/>
                <br/>
                <IconButton onClick={() => onLogin()} text="Login"/>
            </form>
            <br/>
            <IconButton onClick={() => navigate('/signup')} text="Signup"/>
        </div>
    );
}

export default LoginForm;
