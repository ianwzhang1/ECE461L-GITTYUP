import React from 'react';
import '../login-page/Login.css';
import {useNavigate} from "react-router-dom"
import IconButton from "../components/IconButton";
import {post} from "../backendLinker/BackendLink";
import {getCurrentUser} from "../App";

function ProjectForm() {
    let navigate = useNavigate();
    let currentUser = getCurrentUser();
    let onCreate = () => {
        console.log("Creating project...");
        let projName = document.getElementById("name").value;
        let description = document.getElementById("description").value;

        post("proj/add", currentUser, {"name": projName, "desc": description}).then(async (response) => {
            let json = await response.json();
            switch (response.status) {
                case 400:
                    alert(json.message);
                    return;
                case 404:
                    navigate("/");
                    return;
                default:
                    navigate("/projects")
            }
        })
    }

    return (
        <form className="dashboard-login" onSubmit={e => e.preventDefault()}>
            <input className="credentials-input" type="text" name="Project Name" id="name" placeholder="Project Name"
                   required/>
            <input className="credentials-input" type="text" name="Project Description" id="description" placeholder="Project Description"/>
            <br/>
            <IconButton onClick={() => onCreate()} text="Create"/>
        </form>
    );
}

export default ProjectForm;
