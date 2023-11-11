import React from 'react';
import {useNavigate} from "react-router-dom"
import IconButton from "../components/IconButton";
import {post} from "../backendLinker/BackendLink";
import {setCurrentUser, getCurrentUser} from "../App";
import User from "../data/User";

function LoginForm() {
    let navigate = useNavigate();

    let onLogin = () => {
        console.log("Logging in...");
        // Add a password requirement
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        let currentUser = getCurrentUser();

        post("user/login", currentUser, {"usr": username, "pwd": password}).then(async (response) => {
            let json = await response.json();
            switch (response.status) {
                case 400:
                    alert(json.message);
                    return;
                case 404:
                    navigate("/");
                    return;
                default:
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
