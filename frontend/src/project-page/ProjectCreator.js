import {useNavigate} from "react-router-dom";
import PageTitle from "../components/PageTitle";
import LoginForm from "../login-page/LoginForm";
import IconButton from "../components/IconButton";
import React from "react";

function ProjectCreator() {
    let navigate = useNavigate(); // For redirections

    return (
        <div className="app">
            <div className="header">
                <PageTitle icon="fa fa-file" text="New Project"/>
            </div>
            <div className="dashboard-login vertical-tiled shadow-box">
                <h1>Welcome to GittyUp</h1>
                <LoginForm/>
                <IconButton onClick={() => navigate('/signup')} text="New User"/>
            </div>
            <br/>
        </div>
    );
}

export default ProjectCreator;