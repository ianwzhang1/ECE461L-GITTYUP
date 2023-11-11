import React, {Fragment, useContext, useEffect, useState} from 'react';

import Login from './login-page/Login.js';
import './App.css'
import ProjectOverview from './project-overview/ProjectOverview.js'
import {BrowserRouter as Router, Navigate, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import BackgroundCurves from "./components/BackgroundCurves";
import Signup from "./signup-page/Signup";
import Project from "./data/Project";
import ProjectView from "./project-page/ProjectView";
import User from "./data/User";
import ProjectCreator from "./project-page/ProjectCreator";
import Cookies from "universal-cookie";

export const UserContext = React.createContext({
    currentUser: null,
    setCurrentUser: () => {}
});

export const cookies = new Cookies();

export function getCurrentUser() {
    return cookies.get("user");
}

export function setCurrentUser(user) {
    cookies.set("user", user); // Will jsonify the user object
}

export let UseUserContext;

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    UseUserContext = () => {
        return useContext(UserContext);
    }

    function getElementProtected(elem) {
        console.log(currentUser);
        if (currentUser === undefined) {
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
                    <Route exact path="/new-project" element={getElementProtected(<ProjectCreator/>)}/>
                    <Route path="/project/:pid" element={getElementProtected(<ProjectView/>)}/>
                </Routes>
            </UserContext.Provider>
        </Router>

    );
}

export default App;