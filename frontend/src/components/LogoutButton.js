import React, {useContext} from 'react';
import IconButton from "./IconButton";
import {useNavigate} from "react-router-dom";
import {removeCurrentUser, setCurrentUser, UserContext} from "../App";

function LogoutButton() {
    let navigate = useNavigate();

    function logout() {
        removeCurrentUser();
        navigate("/")
    }

    return (
        <div className="logout">
            <IconButton onClick={() => logout()} icon="fa fa-key" text="Logout"></IconButton>
        </div>
    )
}

export default LogoutButton;