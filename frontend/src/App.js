import React, {Fragment} from 'react';

import Login from './loginPageComponents/Login.js';
import SignupForm from './signUpPage/SignupForm.js';
import './App.css'
import ProjectOverview from './project-overview/ProjectOverview.js'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import HW from './hwPage/HW.js';
import login from "./loginPageComponents/LoginForm";
import BackgroundCurves from "./components/BackgroundCurves";
import SignUp from "./signUpPage/SignUp";

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

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={[<Login/>, <BackgroundCurves/>]}/>
                <Route exact path="/signup" element={userID !== null || loginOverride ? [<SignUp/>, <BackgroundCurves/>] : <Navigate replace to={"/"}/>}/>
                <Route exact path="/projects" element={userID !== null || loginOverride ? [<ProjectOverview/>, <BackgroundCurves/>] : <Navigate replace to={"/"}/>}/>
                <Route exact path="/hwSet" element={userID !== null || loginOverride ? [<HW/>, <BackgroundCurves/>] : <Navigate replace to={"/"}/>}/>
            </Routes>
        </Router>

    );
}

export default App;