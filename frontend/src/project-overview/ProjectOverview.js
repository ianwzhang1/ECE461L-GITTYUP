import React, {useEffect, useState} from "react";
import ProjectPreview from "./ProjectPreview";
import IconButton from "../components/IconButton";
import PageTitle from "../components/PageTitle";
import {useLocation, useNavigate} from "react-router-dom";
import {get, post} from "../backendLinker/BackendLink";
import {getCurrentUser, validateUser} from "../App";
import LogoutButton from "../components/LogoutButton";

function ProjectOverview() {
    let navigate = useNavigate();
    let location = useLocation();
    let [projects, setProjects] = useState(null);

    let currentUser = getCurrentUser();

    function loadProjects() {
        // Load in all the data
        get("user/summaries", currentUser, {"uid": currentUser.id}).then(async (response) => {
            let json = await response.json();
            switch (response.status) {
                case 400:
                    alert(json.message);
                    return;
                case 404:
                    navigate("/")
                    return;
                default:
                    let toShow = [];
                    Object.entries(json).forEach((entry) => {
                        entry[1].id = entry[0];
                        toShow.push(entry[1]);
                    });
                    setProjects(toShow);
            }
        });
    }

    useEffect(() => {
        if (!validateUser(currentUser, navigate)) return;
        loadProjects();
    }, [location]);

    function getProjects(projects) {
        if (projects === null) {
            return <h1>Loading...</h1>
        }

        if (Object.keys(projects).length !== 0) {
            return projects.map((project, id) => (
                <ProjectPreview key={"preview_" + id} project={project}/>
            ))
        } else {
            return <h1>No Projects</h1>
        }
    }

    function joinProject() {
        let elem = document.getElementById("join-input");
        let projName = elem.value;

        if (projName === "") {
            alert("Please enter a Project Name!")
            return;
        }

        post("proj/user_add", currentUser, {"projname": projName, "uid": currentUser.id}).then(async (response) => {
            let json = await response.json();
            switch (response.status) {
                case 400:
                    alert(json.message);
                    return;
                case 404:
                    navigate("/")
                    return;
                default:
                    alert("Joined " + projName + "!");
                    elem.value = '';
                    loadProjects();
            }
        })
    }

    return (
        <div className="app">
            <div className="header">
                <PageTitle icon="fa fa-folder-open" text="Projects"/>
                <LogoutButton/>
            </div>

            <div className="project-frame">
                <div className="horizontal-tiled">
                    {getProjects(projects)}
                </div>
            </div>

            <br/>

            <IconButton onClick={() => navigate("/new-project")} icon="fa fa-address-card" text="New Project"/>
            <form onSubmit={e => e.preventDefault()} className="horizontal-tiled pill-box">
                <input className="project-input pill-input" id="join-input" />
                <IconButton onClick={() => joinProject()} icon="fa fa-door-open" text="Join Project"/>
            </form>
        </div>
    );
}

export default ProjectOverview