import React, {Fragment} from 'react';

import Login from './login-page/Login.js';
import SignupForm from './signup-page/SignupForm.js';
import './App.css'
import ProjectOverview from './project-overview/ProjectOverview.js'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import HW from './hwPage/HW.js';
import login from "./login-page/LoginForm";
import BackgroundCurves from "./components/BackgroundCurves";
import Signup from "./signup-page/Signup";
import Project from "./data/Project";

const url = "http://ec2-13-59-237-43.us-east-2.compute.amazonaws.com:5000/"

const loginOverride = true;
export let userID = null;

export async function postData(path, data) {
    const response = await fetch(url + path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export async function getData(path) {
    const response = await fetch(url + path, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
    return response.json();
}


function App() {

    let getElement = (elem) => {
        return userID !== null || loginOverride ? [<BackgroundCurves/>, elem] : <Navigate replace to={"/"}/>;
    }

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={getElement(<Login/>)}/>
                <Route exact path="/signup" element={getElement(<Signup/>)}/>
                <Route exact path="/projects" element={getElement(<ProjectOverview/>)}/>
                <Route exact path="/hwSet" element={getElement(<HW/>)}/>
            </Routes>
        </Router>

    );
}

export default App;