import {useNavigate} from "react-router-dom";
import PageTitle from "../components/PageTitle";
import IconButton from "../components/IconButton";
import React from "react";
import ProjectForm from "./ProjectForm";

function ProjectCreator() {
    let navigate = useNavigate(); // For redirections

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