
import React from 'react';
import './Login.css';
import {Link} from "react-router-dom"

//import Box from './Box';
// import './box.css';
//import {postData} from "../App.js"

//const  url = 'http://ec2-18-222-237-211.us-east-2.compute.amazonaws.com:5000/'
const url = 'http://127.0.0.1:5000/'
  // npm install react-router-dom@5 run this to install router

  async function postData(path, data) {
    const response = await fetch(url + path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "plain/text"
        },
        body: JSON.stringify(data)
    });
    return response.text()//.json();
  }


class Login extends React.Component {

  onLogin(){
    console.log("notPoop");
    postData("user/login",
      {
      "usr": "iwzhang",
      "pwd": "123456"
      }).then((data) => {
        console.log(data)
      })

      //find out how to get data from forms
      
  }

  render(){
    return (
      <div className="dashboard-login">
          <div  className="form">
            <header>Welcome to GittyUp</header>
            <br />
            <form onSubmit={e => e.preventDefault()} className="form-example">
              <div className="username">
                <div className="overlap-group-2">
                  <div className="text-wrapper">USERNAME</div>
                  {/* <img className="user" alt="User" src="user.svg" /> */}
                </div>
                <input type="text" name="Username" id="Username" placeholder="Username" required />
              </div>
              <br></br>
              <div className="password">
                <div className="overlap-group-2">
                  <div className="password-2">PASSWORD</div>
                  {/* <img className="lock" alt="Lock" src="lock.svg" /> */}
                </div>
                <input type="password" name="Password" id="Password" placeholder="Password"  required />
              </div>
              <button className="login-btn" onClick={() => this.onLogin()}>
                <div className="login-wrapper">
                  <div className="login">LOGIN</div>
                </div>
              </button>
              <div className="sign-up-link">
                <Link to ="/SignUp">Sign Up</Link>
              </div>
            </form>
          </div>
      </div>
    );
  }
}

export default Login;
