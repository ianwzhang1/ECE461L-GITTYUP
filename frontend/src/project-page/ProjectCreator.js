import {useLocation, useNavigate} from "react-router-dom";
import PageTitle from "../components/PageTitle";
import IconButton from "../components/IconButton";
import React, {useEffect} from "react";
import ProjectForm from "./ProjectForm";
import {getCurrentUser, validateUser} from "../App";

function ProjectCreator() {
    let navigate = useNavigate(); // For redirections
    let location = useLocation();
    let currentUser = getCurrentUser();

    useEffect(() => {
        if (!validateUser(currentUser, navigate)) return;
    }, [location]);

    return (
        <div className="app">
            <div className="header">
                <PageTitle icon="fa fa-file" text="New Project"/>
            </div>
            <div className="dashboard-login vertical-tiled shadow-box">
                <h1>Create a project</h1>
                <ProjectForm/>
                <IconButton onClick={() => navigate('/projects')} text="Cancel"/>
            </div>
            <br/>
        </div>
    );
}

export default ProjectCreator;