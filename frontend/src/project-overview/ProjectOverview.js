import React from "react";
import "./style.css";
import "./button.css";
import {NavBar} from "../navBar/NavBar.js";
import ProjectPreview from "./ProjectPreview";
import IconButton from "../components/IconButton";
import PageTitle from "../components/PageTitle";
import {getData, postData, userID} from "../App";
import { useNavigate } from "react-router-dom";

export const ProjectOverview = () => {

    // Load in all the projects
    let projects = null;
    getData("user/projects?uid=" + userID).then((data) => {
        projects = data;
        console.log(data);
    })

    const handleClick = () => {
        alert('Button Clicked!');
    };

    return (
        <div className="app">
            <div className="header">
                <PageTitle text="Projects"/>
                <NavBar/>
            </div>

            <div className="project-frame">
                <div className="horizontal-tiled">
                    <ProjectPreview/>
                    <ProjectPreview/>
                    <ProjectPreview/>
                </div>
            </div>

            <IconButton icon="fa fa-folder" text="New Project"/>
        </div>
    );
};

export default ProjectOverview