import React, {useContext, useEffect, useState} from "react";
import "./style.css";
import {Navbar} from "../navBar/Navbar.js";
import ProjectPreview from "./ProjectPreview";
import IconButton from "../components/IconButton";
import PageTitle from "../components/PageTitle";
import {useLocation, useNavigate} from "react-router-dom";
import ProjectView from "../data/Project";
import HW from "../data/HW";
import Project from "../data/Project";
import {get} from "../backendLinker/BackendLink";
import {UserContext} from "../App";

function ProjectOverview() {
    let navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(UserContext);

    let [projects, setProjects] = useState([]);

    // Load in all the data
    get("user/projects", {"uid": currentUser.id}).then(async (response) => {
        setProjects(await response.json());
    });
     // [new Project('5187445e-916e-5b70-a56c-297f75f8814b', 'Project1', [new HW('Hammer', 10), new HW('Axe', 10), new HW('Jackhammer', 10), new HW('Knife', 10)]),
        //new Project('07206b06-e8d5-524a-999c-da95d21ff5c3', 'Project2', [new HW('Hammer', 20)])]

    function newProject() {
        navigate("/new-project");
    }

    return (
        <div className="app">
            <div className="header">
                <PageTitle icon="fa fa-folder-open" text="Projects"/>
                <Navbar/>
            </div>

            <div className="project-frame">
                <div className="horizontal-tiled">
                    {Object.keys(projects).length !== 0 ? projects.map((project) => (
                        <ProjectPreview project={project}/>
                    )) : <h1>No Projects</h1>}
                </div>
            </div>

            <IconButton onClick={() => newProject()} icon="fa fa-folder" text="New Project"/>
        </div>
    );
}

export default ProjectOverview