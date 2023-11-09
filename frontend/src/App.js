import React, {Fragment} from 'react';

import NewBox from './loginPageComponents/NewBox.js';
import SignUpBox from './signUpPage/SignUpBox.js';
import './App.css'
import ProjectOverview from './project-overview/ProjectOverview.js'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import HW from './hwPage/HW.js';
import login from "./loginPageComponents/Login";

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
                <Route exact path="/" element={<NewBox/>}/>
                <Route exact path="/signup" element={userID !== null || loginOverride ? <SignUpBox/> : <Navigate replace to={"/"}/>}/>
                <Route exact path="/projects" element={userID !== null || loginOverride ? <ProjectOverview/> : <Navigate replace to={"/"}/>}/>
                <Route exact path="/hwSet" element={userID !== null || loginOverride ? <HW/> : <Navigate replace to={"/"}/>}/>
            </Routes>
        </Router>

    );
}

export default App;