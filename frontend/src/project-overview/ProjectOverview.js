import React from "react";
import "./style.css";
import {Navbar} from "../navBar/Navbar.js";
import ProjectPreview from "./ProjectPreview";
import IconButton from "../components/IconButton";
import PageTitle from "../components/PageTitle";
import {getData, postData, userID} from "../App";
import { useNavigate } from "react-router-dom";
import ProjectView from "../data/Project";
import HW from "../data/HW";
import Project from "../data/Project";

function ProjectOverview() {

    // Load in all the data
    // TODO: Change this to be populated with real data via REST
    let projects = [new Project('5187445e-916e-5b70-a56c-297f75f8814b', 'Project1', [new HW('Hammer', 10), new HW('Axe', 10), new HW('Jackhammer', 10), new HW('Knife', 10)]),
        new Project('07206b06-e8d5-524a-999c-da95d21ff5c3', 'Project2', [new HW('Hammer', 20)])]

    const handleClick = () => {
        alert('Button Clicked!');
    };

    return (
        <div className="app">
            <div className="header">
                <PageTitle icon="fa fa-folder-open" text="Projects"/>
                <Navbar/>
            </div>

            <div className="project-frame">
                <div className="horizontal-tiled">
                    {projects.map((project) => (
                        <ProjectPreview project={project}/>
                    ))}
                </div>
            </div>

            <IconButton icon="fa fa-folder" text="New Project"/>
        </div>
    );
}

export default ProjectOverview