import React, {Fragment, useContext, useEffect, useState} from 'react';

import Login from './login-page/Login.js';
import './App.css'
import ProjectOverview from './project-overview/ProjectOverview.js'
import {BrowserRouter as Router, Navigate, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import HW from './hwPage/HW.js';
import BackgroundCurves from "./components/BackgroundCurves";
import Signup from "./signup-page/Signup";
import Project from "./data/Project";
import ProjectView from "./project-page/ProjectView";
import User from "./data/User";
import {current_user} from "./backendLinker/BackendLink";

const url = "http://ec2-13-59-237-43.us-east-2.compute.amazonaws.com:5000/"

export const UserContext = React.createContext({
    currentUser: null,
    setCurrentUser: () => {}
});
export let UseUserContext = () => useContext(UserContext);

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
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    function getElementProtected(elem) {
        if (currentUser === null) {
            return <Navigate replace to={"/"}/>
        }
        return getElement(elem);
    }

    function getElement(elem) {
        return [<BackgroundCurves/>, elem];
    }

    return (
        <Router>
            <UserContext.Provider value={value}>
                <Routes>
                    <Route exact path="/" element={getElement(<Login/>)}/>
                    <Route exact path="/signup" element={getElement(<Signup/>)}/>
                    <Route exact path="/projects" element={getElementProtected(<ProjectOverview/>)}/>
                    <Route exact path="/hwSet" element={getElement(<HW/>)}/>
                    <Route path="/project/:pid" element={getElement(<ProjectView/>)}/>
                </Routes>
            </UserContext.Provider>
        </Router>

    );
}

export default App;