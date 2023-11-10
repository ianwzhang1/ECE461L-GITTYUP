import React, {Fragment} from 'react';

import Login from './login-page/Login.js';
import './App.css'
import ProjectOverview from './project-overview/ProjectOverview.js'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import HW from './hwPage/HW.js';
import BackgroundCurves from "./components/BackgroundCurves";
import Signup from "./signup-page/Signup";
import Project from "./data/Project";
import ProjectView from "./project-page/ProjectView";
import User from "./data/User";

const url = "http://ec2-13-59-237-43.us-east-2.compute.amazonaws.com:5000/"

const loginOverride = true;
export let user = new User("e1eb5453-266c-5954-9655-6a4738fd2470", "Ian Zhang", ["5187445e-916e-5b70-a56c-297f75f8814b"], "12345"); // TODO: this should be set when logging in

export async function postData(path, data) {
    const response = await fetch(url + path, {
        method: "POST", headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        }, body: JSON.stringify(data)
    });
    return response.json();
}

export async function getData(path) {
    const response = await fetch(url + path, {
        method: "GET", headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        }
    });
    return response.json();
}


function App() {

    let getElement = (elem) => {
        return user !== null || loginOverride ? [<BackgroundCurves/>, elem] : <Navigate replace to={"/"}/>;
    }

    return (<Router>
            <Routes>
                <Route exact path="/" element={getElement(<Login/>)}/>
                <Route exact path="/signup" element={getElement(<Signup/>)}/>
                <Route exact path="/projects" element={getElement(<ProjectOverview/>)}/>
                <Route exact path="/hwSet" element={getElement(<HW/>)}/>
                <Route path="/project/:pid" element={getElement(<ProjectView/>)}/>
            </Routes>
        </Router>

    );
}

export default App;