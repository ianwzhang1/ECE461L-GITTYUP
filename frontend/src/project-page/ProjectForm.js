import React, {useContext} from 'react';
import '../login-page/Login.css';
import {Link, Navigate, useNavigate} from "react-router-dom"
import IconButton from "../components/IconButton";
import BackendLink, {get, post, request, setCurrentUser} from "../backendLinker/BackendLink";
import {setUser, user, global, setGlobal, UserContext} from "../App";
import User from "../data/User";

function ProjectForm() {
    let navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(UserContext);

    let onCreate = () => {
        console.log("Creating project...");
        let projName = document.getElementById("name").value;

        post("proj/add", currentUser, {"name": projName}).then(async (response) => {
            let json = await response.json();
            if (response.status !== 200) {
                alert(json.message);
            } else {
                navigate("/projects");
            }
        })
    }

    return (
        <form className="dashboard-login" onSubmit={e => e.preventDefault()}>
            <input className="credentials-input" type="text" name="Project name" id="name" placeholder="Project Name"
                   required/>
            <br/>
            <IconButton onClick={() => onCreate()} text="Create"/>
        </form>
    );
}

export default ProjectForm;
