import React from 'react';
import './ProjectView.css';
import {useNavigate, useParams} from "react-router-dom";
import PageTitle from "../components/PageTitle";
import SignupForm from "../signup-page/SignupForm";
import IconButton from "../components/IconButton";
import Project from "../data/Project";
import HW from "../data/HW";

function ProjectView(props) {
    let navigate = useNavigate(); // For redirections
    let params = useParams();

    // The project path is located at params['pid']. Use this to get more detailed info about the project.
    console.log(params['pid'])
    // TODO: Perform a request to get detailed project data
    let project = new Project('5187445e-916e-5b70-a56c-297f75f8814b', 'Project1', [new HW('Hammer', 10), new HW('Axe', 10), new HW('Jackhammer', 10), new HW('Knife', 10)]);

    return (
        <div className="app">
            <div className="header">
                <PageTitle icon="fa fa-file" text="Project"/>
            </div>
            <div className='dashboard-login vertical-tiled'>
                <h1>{project.name}</h1>
                <div className="table-wrapper">
                    <table className="fl-table">
                        <thead>
                        <tr>
                            <th>Hardware</th>
                            <th>Description</th>
                            <th>Availability</th>
                            <th>Modify Checked Out</th>
                        </tr>
                        </thead>
                        <tbody>
                        {project.hw.map((hardware) => (
                            // TODO: Get details about hardware to find out description and total availability, since this is not in the project
                            <tr>
                                <td>{hardware.name}</td>
                                <td>{"Description"}</td>
                                <td>{"Availability"}</td>
                                <td>
                                    <div className="pill-box">
                                        <input className="qty-input" value={hardware.amount}></input> <button className="small-button">Apply</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <br/>
            <IconButton onClick={() => navigate('/projects')} text="Back to Projects"/>
        </div>
    );
}

export default ProjectView;
