import React from 'react'

import "./project.css";
import IconButton from "../components/IconButton";
import HWList from "./HWList";
import {useNavigate} from "react-router-dom";
import {getCurrentUser, validateUser} from "../App";

function ProjectPreview(props) {

    let navigate = useNavigate();

    let manageProject = (projectID) => {
        validateUser(getCurrentUser(), navigate);

        if (projectID === undefined) {
            alert("ProjectView is missing ID");
            return;
        }
        navigate("/project/" + projectID);
    }

    return (
        <div className="project shadow-box">
            <h1>{props.project.name}</h1>
            {Object.keys(props.project.checked_out).length !== 0 ? <HWList hw={props.project.checked_out}/> :
            <h2>No Hardware</h2>}
            <IconButton onClick={() => manageProject(props.project.id)} icon="fa fa-wrench" text="Manage"/>
        </div>
    )
}

export default ProjectPreview;