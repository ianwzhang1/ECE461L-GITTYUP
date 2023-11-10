import React, {useContext} from 'react';
import './Login.css';
import {Link, Navigate, useNavigate} from "react-router-dom"
import IconButton from "../components/IconButton";
import BackendLink, {get, post, setCurrentUser} from "../backendLinker/BackendLink";
import {setUser, user, global, setGlobal, UserContext} from "../App";
import User from "../data/User";

//import Box from './Box';
// import './box.css';
//import {postData} from "../App.js"

function LoginForm() {
    let navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(UserContext);

    let onLogin = () => {
        console.log("Logging in...");
        // Add a password requirement
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        post("user/login", {"usr": username, "pwd": password}).then(async (response) => {
            let json = await response.json();
            if (response.status === 400) {
                alert(json.message);
            } else {
                let sessionId = json.session_id;
                let uid = json.uid;
                setCurrentUser(new User(uid, username, sessionId));
                navigate("/projects")
            }
        })
    }

    return (
        <form className="dashboard-login" onSubmit={e => e.preventDefault()}>
            <input className="credentials-input" type="text" name="Username" id="username" placeholder="Username"
                   required/>
            <input className="credentials-input" type="password" name="Password" id="password"
                   placeholder="Password" required/>
            <br/>
            <IconButton onClick={() => onLogin()} text="Login"/>
        </form>
    );
}

export default LoginForm;
