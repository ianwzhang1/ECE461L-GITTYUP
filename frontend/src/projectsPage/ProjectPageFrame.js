import React from "react";
import "./style.css";
import "./button.css";
import { Box } from "./Box.js";
import {Project} from "./Project.js";



export const ProjectPageFrame = () => {

  const handleClick = () => {
    alert('Button Clicked!');
  };

  return (
    <div className="frame">
      <div className="overlap">
        
        <div className="div">
          <div className="overlap-group">
            <div className="text-wrapper">My Projects</div>
            
          </div>
          <img className="icon-folder-file" alt="Icon folder file" src="icon_folder file project_.svg" />
        </div>
        <div className="group">
            <Box />
        </div>
        <div className="project-frame">
          <div className="div-3">
            <div className="div-4">
                <Project />
            </div>
            <div className="div-5">
                <Project />
            </div>
            <div className="div-6">
                <Project />
            </div>
          </div>
        </div>
        <div className="overlap-wrapper">
          <div className="new-project">
            <button className="button" onClick={handleClick}>+ New Project +</button>
          </div>
        </div>
        <div className="icon-person-wrapper">
          <img className="icon-person" alt="Icon person" src="icon_person_.svg" />
        </div>
      </div>
      
    </div>
  );
};

// export 'default' ProjectPageFrame
export default ProjectPageFrame