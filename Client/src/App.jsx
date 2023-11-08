import React from 'react';
// import Box from './Box.jsx';
 import Login from './LoginPageComponents/Login.jsx';
import NewBox from './LoginPageComponents/NewBox.jsx';
import SignUpBox from './SignUpPage/SignUpBox.jsx';
import './App.css'
import Projects from './Projects/Projects.jsx'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

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
          <Route exact path="/SignUp">
            <SignUpBox>
            </SignUpBox>
          </Route>
          <Route exact path="/Projects">
            <Projects></Projects>
          </Route>
          
        </Switch>


      </div>
    </Router>

  );
}

export default App;

