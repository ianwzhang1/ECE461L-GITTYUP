import React from 'react';
import './SignUp.css';
import {Link} from "react-router-dom"
//import Box from './Box';
// import './box.css';


function SignUp() {
    return (
        <div>
            <header>Welcome to GittyUp</header>
            <br/>
            <form action="" method="get">
                <div className="username">
                    <div className="overlap-group-2">
                        <div className="text-wrapper">USERNAME</div>
                        {/* <img className="user" alt="User" src="user.svg" /> */}
                    </div>
                    <input type="text" name="Username" id="Username" placeholder="Username" required/>
                </div>
                <br></br>
                <div className="password">
                    <div className="overlap-group-2">
                        <div className="password-2">PASSWORD</div>
                        {/* <img className="lock" alt="Lock" src="lock.svg" /> */}
                    </div>
                    <input type="password" name="Password" id="Password" placeholder="Password" required/>
                </div>
                <button className="login-btn">
                    <div className="login-wrapper">
                        <div className="login">SIGN UP</div>
                    </div>
                </button>
                <div className="sign-up-link">
                    <Link to="/">Back to login?</Link>
                    <Link to="/Projects">Peep the projects</Link>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
