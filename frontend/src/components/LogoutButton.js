import React, {useContext} from 'react';
import IconButton from "./IconButton";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../App";

function LogoutButton() {
    let navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(UserContext);

    function logout() {
        setCurrentUser(null);
        navigate("/")
    }

    return (
        <IconButton onClick={() => logout()} className="logout" icon="fa fa-key" text="Logout"></IconButton>
    )
}

export default LogoutButton;