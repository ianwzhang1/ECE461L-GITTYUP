import React, {useContext, useEffect, useState} from "react";
import "./ProjectView.css";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import PageTitle from "../components/PageTitle";
import SignupForm from "../signup-page/SignupForm";
import IconButton from "../components/IconButton";
import Project from "../data/Project";
import HW from "../data/HW";
import {current_user} from "../backendLinker/BackendLink";
import {UserContext, getCurrentUser} from "../App";
import BackendLink, {
    get,
    post,
    request,
    setCurrentUser,
} from "../backendLinker/BackendLink";
import LogoutButton from "../components/LogoutButton";


function ProjectView(props) {
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
            console.log(data);
            setProject(data);
        });
    }

    useEffect(() => {
        reloadProject();
    }, [location]);

    let currentUser = getCurrentUser();
    // The project path is located at params['pid']. Use this to get more detailed info about the project.


    let addCollaborator = () => {
        let collaborator = document.getElementById("collaborator-input");
        post("proj/user_add", currentUser, {"pid": pid, "username": collaborator.value}).then(async (response) => {
            switch (response.status) {
                case 400:
                    alert(response.json().message)
                    return;
                case 404:
                    alert("Please log back in!")
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
        if (quant === null || quant === 0) return;
        post("proj/checkout", currentUser, {"hid": input, "pid": pid, "quant": quant}).then(async (response) => {
            switch (response.status) {
                case 400:
                    alert("Invalid quantity!")
                    return;
                case 404:
                    alert("Please log back in!")
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
        if (quant === null || quant === 0) return;
        post("proj/return", currentUser, {"hid": input, "pid": pid, "quant": quant}).then(async (response) => {
            switch (response.status) {
                case 400:
                    alert("Invalid quantity!")
                    return;
                case 404:
                    alert("Please log back in!")
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
                        {project.hw.map((hardware) => (
                            <tr>
                                <td>{hardware.name}</td>
                                <td><label className="desc-label">{hardware.desc}</label></td>
                                <td>{hardware.availability}</td>
                                <td><label className="qty-input">{hardware.checked_out}</label></td>
                                <td>
                                    <div className="pill-box">
                                        <input type="text" className="qty-input" id={hardware.hid} placeholder={"Qty"}></input>
                                        <button className="small-button" onClick={() => checkOut(hardware.hid)}>+</button>
                                        <button className="small-button" onClick={() => checkIn(hardware.hid)}>-</button>
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
            {true ? ( // TODO: Admin only operation
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
