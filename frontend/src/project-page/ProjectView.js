import React, {useEffect, useState} from "react";
import "./ProjectView.css";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import PageTitle from "../components/PageTitle";
import IconButton from "../components/IconButton";
import Project from "../data/Project";
import {getCurrentUser, validateUser} from "../App";
import {get, post} from "../backendLinker/BackendLink";
import LogoutButton from "../components/LogoutButton";


function ProjectView() {
    let navigate = useNavigate(); // For redirections
    let params = useParams();
    let location = useLocation();
    const [project, setProject] = useState(
        new Project("", "Loading, please wait", [])
    );

    let pid = params["pid"];

    function reloadProject() {
        get("proj/info", currentUser, {"pid": pid}).then(async (response) => {
            let data = await response.json();
            switch (response.status) {
                case 400:
                    alert(data.message);
                    return;
                case 404:
                    navigate("/")
                    return;
                default:
                    setProject(data)
            }
        });
    }

    useEffect(() => {
        if (!validateUser(currentUser, navigate)) return;
        reloadProject();
    }, [location]);

    let currentUser = getCurrentUser();

    let addCollaborator = () => {
        let collaborator = document.getElementById("collaborator-input");
        post("proj/user_add", currentUser, {"pid": pid, "username": collaborator.value}).then(async (response) => {
            let json = await response.json();
            switch (response.status) {
                case 400:
                    alert(json.message);
                    return;
                case 404:
                    navigate("/")
                    return;
                default:
                    alert("Added " + collaborator.value + " to the project!")
                    collaborator.value = '';
                    reloadProject();
            }
        })
    };

    function checkOut(input) {
        let element = document.getElementById(input);
        let quant = element.value;
        if (quant === '' || quant === 0) return;
        post("proj/checkout", currentUser, {"hid": input, "pid": pid, "quant": quant}).then(async (response) => {
            let json = await response.json();
            switch (response.status) {
                case 400:
                    alert(json.message);
                    return;
                case 404:
                    navigate("/");
                    return;
                default:
                    element.value = '';
                    reloadProject();
            }
        })
    }

    function checkIn(input) {
        let element = document.getElementById(input);
        let quant = element.value;
        if (quant === '' || quant === 0) return;
        post("proj/return", currentUser, {"hid": input, "pid": pid, "quant": quant}).then(async (response) => {
            let json = await response.json();
            switch (response.status) {
                case 400:
                    alert(json.message);
                    return;
                case 404:
                    navigate("/");
                    return;
                default:
                    element.value = '';
                    reloadProject();
            }
        })
    }


    return (
        <div className="app">
            <div className="header">
                <PageTitle icon="fa fa-file" text="Project"/>
                <LogoutButton/>
            </div>
            <div className="dashboard-login vertical-tiled">
                <h1>{project.name}</h1>
                <h4>{project.desc}</h4>
                <div className="table-wrapper">
                    <table className="fl-table">
                        <thead>
                        <tr>
                            <th>Hardware</th>
                            <th>Description</th>
                            <th>Availability</th>
                            <th style={{padding: "0 10px"}}>Checked Out</th>
                            <th>Checkout/Return</th>
                        </tr>
                        </thead>
                        <tbody>
                        {project.hw.map((hardware, id) => (
                            <tr key={"row_" + id}>
                                <td>{hardware.name}</td>
                                <td><label className="desc-label">{hardware.desc}</label></td>
                                <td>{hardware.availability}</td>
                                <td><label className="qty-input">{hardware.checked_out}</label></td>
                                <td>
                                    <div className="pill-box">
                                        <input type="number" className="qty-input pill-input" id={hardware.hid}
                                               placeholder={"Qty"}></input>
                                        <button className="small-button" onClick={() => checkOut(hardware.hid)}>+
                                        </button>
                                        <button className="small-button" onClick={() => checkIn(hardware.hid)}>-
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <br/>
            <IconButton
                onClick={() => navigate("/projects")}
                text="Back to Projects"
            />
            {false ? ( // TODO: Admin only operation
                <div>
                    <br/>
                    <h1>Admin Controls</h1>
                    <input id="collaborator-input" className="name-input"></input>
                    <IconButton
                        onClick={() => addCollaborator()}
                        icon="fa fa-plus"
                        text="Add Collaborator"
                    />
                </div>
            ) : null}
        </div>
    );
}

export default ProjectView;
