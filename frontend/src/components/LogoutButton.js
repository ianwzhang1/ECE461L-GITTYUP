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
        <IconButton onClick={() => logout()} className="logout" icon="fa fa-key" text="Logout"></IconButton>
    )
}

export default LogoutButton;