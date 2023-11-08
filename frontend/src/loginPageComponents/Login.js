
import React from 'react';
import './Login.css';
import {Link} from "react-router-dom"

//import Box from './Box';
// import './box.css';

class Login extends React.Component {

  onLogin(){
    console.log("notPoop");
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
                <input type="password" name="Password" id="Password" placeholder="Password" required />
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
