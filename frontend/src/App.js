import Login from './login-page/Login.js';
import './App.css'
import ProjectOverview from './project-overview/ProjectOverview.js'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import BackgroundCurves from "./components/BackgroundCurves";
import Signup from "./signup-page/Signup";
import ProjectView from "./project-page/ProjectView";
import ProjectCreator from "./project-page/ProjectCreator";
import Cookies from "universal-cookie";

export const cookies = new Cookies();

export function getCurrentUser() {
    return cookies.get("user");
}

export function setCurrentUser(user) {
    cookies.set("user", user); // Will jsonify the user object
}

export function removeCurrentUser() {
    cookies.remove("user");
}

export function validateUser(currentUser, navigate) {
    if (currentUser === undefined) {
        console.log("User is not logged in");
        navigate("/")
        return false;
    }
    return true;
}

function App() {

    let curveId = 0; // Suppress dupe key issues

    function getElement(elem) {
        return [<BackgroundCurves key={"curve_" + curveId++}/>, elem];
    }

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={getElement(<Login key="login"/>)}/>
                <Route exact path="/signup" element={getElement(<Signup key="signup"/>)}/>
                <Route exact path="/projects" element={getElement(<ProjectOverview key="projoverview"/>)}/>
                <Route exact path="/new-project" element={getElement(<ProjectCreator key="projcreator"/>)}/>
                <Route path="/project/:pid" element={getElement(<ProjectView key="projview"/>)}/>
            </Routes>
        </Router>

    );
}

export default App;