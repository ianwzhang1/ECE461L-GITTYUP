import React from 'react'

import "./project.css";
import IconButton from "../components/IconButton";
import HWList from "./HWList";
import {useNavigate} from "react-router-dom";
import project from "../data/Project";

function ProjectPreview(props) {

    let navigate = useNavigate();

    let manageProject = (projectID) => {
        if (projectID === undefined) {
            alert("ProjectView is missing ID");
            return;
        }
        navigate("/project/" + projectID);
    }

    return (
        <div className="project">
            <h1>{props.project.name}</h1>
            <HWList hw={props.project.hw}/>
            <IconButton onClick={() => manageProject(props.project.id)} icon="fa fa-wrench" text="Manage"/>
        </div>
    )
}

export default ProjectPreview;