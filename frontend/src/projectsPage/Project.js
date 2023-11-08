import React from 'react'

import "./project.css";
import "./button.css";
import {HWSet} from "./HWSet.js";


export const Project = () => {
    const handleClick = () => {
        alert('Button Clicked!');
      };
    return(
        <div className="project">
            <div className="text-wrapper">Project</div>
            <div className="collaborators">add collaborators</div>
            <HWSet />
            <div className="group">
                <div className="overlap-group">
                    <button className="button" onClick={handleClick}>Launch</button>
                </div>
            </div>
            <img className="icon-user-friends" alt="Icon user" src="icon_User Friends_.svg" />
        </div>
    )
}