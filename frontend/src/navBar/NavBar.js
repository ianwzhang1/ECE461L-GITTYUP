import React from 'react'
import "./navBar.css";


export const NavBar = () => {
    return (
        <div className="horizontal-tiled pill-box">
            <img className="navbar-element" alt="Icon home" src="icon_home_.svg"/>
            <img className="navbar-element" alt="Icon library" src="icon_Library_.svg"/>
            <img className="navbar-element" alt="Icon address book" src="icon_address book_.svg"/>
            <img className="navbar-element" alt="Icon settings" src="icon_settings_.svg"/>
            <img className="navbar-element" alt="Icon folder file" src="icon_folder file project_.svg"/>
        </div>
    );
};