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
import {get, request} from "../backendLinker/BackendLink";
import {getCurrentUser, UserContext} from "../App";
import Login from "../login-page/Login";
import LogoutButton from "../components/LogoutButton";
import Cookies from "universal-cookie";
import project from "../data/Project";

let set = false;

function ProjectOverview() {
    let navigate = useNavigate();
    let [projects, setProjects] = useState(null);

    let currentUser = getCurrentUser();

    // Load in all the data
    if (!set) {
        get("user/summaries", currentUser, {"uid": currentUser.id}).then(async (response) => {
            let data = await response.json();
            let toShow = [];
            Object.entries(data).forEach((entry) => {
                entry[1].id = entry[0];
                toShow.push(entry[1]);
            });
            setProjects(toShow);
        });
    }
     // [new Project('5187445e-916e-5b70-a56c-297f75f8814b', 'Project1', [new HW('Hammer', 10), new HW('Axe', 10), new HW('Jackhammer', 10), new HW('Knife', 10)]),
        //new Project('07206b06-e8d5-524a-999c-da95d21ff5c3', 'Project2', [new HW('Hammer', 20)])]

    function newProject() {
        navigate("/new-project");
    }

    function getProjects(projects) {
        if (projects === null) {
            return <h1>Loading...</h1>
        }

        if (Object.keys(projects).length !== 0){
            return projects.map((project) => (
                <ProjectPreview project={project}/>
            ))
        } else {
            return <h1>No Projects</h1>
        }
    }

    return (
        <div className="app">
            <div className="header">
                <PageTitle icon="fa fa-folder-open" text="Projects"/>
                <Navbar/>
                <LogoutButton/>
            </div>

            <div className="project-frame">
                <div className="horizontal-tiled">
                    {getProjects(projects)}
                </div>
            </div>

            <IconButton onClick={() => newProject()} icon="fa fa-folder" text="New Project"/>
        </div>
    );
}

export default ProjectOverview