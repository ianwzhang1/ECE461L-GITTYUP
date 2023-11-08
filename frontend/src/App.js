import React from 'react';
// import Box from './Box.jsx';
import NewBox from './loginPageComponents/NewBox.js';
import SignUpBox from './signUpPage/SignUpBox.js';
import './App.css'
// import Projects from './projects/Projects.js'
import ProjectPageFrame from './projectsPage/ProjectPageFrame.js'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HW from './hwPage/HW.js';




const  url = 'http://ec2-18-222-237-211.us-east-2.compute.amazonaws.com:5000/'
  // npm install react-router-dom@5 run this to install router

  async function postData(path, data) {
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


function App() {
  return (
    <Router>
      <div className = 'AppDiv'>
        <Switch>
          <Route exact path="/">
            <NewBox>
            </NewBox>
          </Route>
          <Route exact path="/signup">
            <SignUpBox>
            </SignUpBox>
          </Route>
          <Route exact path="/projects">
            <ProjectPageFrame/>
          </Route>
          <Route exact path="/hwSet">
            <HW />
          </Route>
          
          
        </Switch>


      </div>
    </Router>

  );
}

export default App;

