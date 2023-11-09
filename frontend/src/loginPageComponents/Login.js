import React from 'react';
import './NewBox.css';
import LoginForm from './LoginForm.js';

class Login extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='app vertical-tiled'>
                <LoginForm></LoginForm>
            </div>
        );
    }
}

export default Login;