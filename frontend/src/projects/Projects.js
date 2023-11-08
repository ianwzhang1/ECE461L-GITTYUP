import React from 'react';
import './Projects.css'
import Project from './Project'
import {Link} from "react-router-dom"


function Projects() {
    return (
      <div className='ProjectsBox'>
        <Project></Project>
        <br></br>
        <Project></Project>
        <br></br>
        <Project></Project>

        <br></br>
        <Link to ="/">Back to login?</Link>
      </div>
    )
  }
  
  export default Projects;