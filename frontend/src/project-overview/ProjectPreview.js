import React from 'react'

import "./project.css";
import "./button.css";
import {HWList} from "./HWList.js";
import IconButton from "../components/IconButton";

class ProjectPreview extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="project">
                <h1>Project Name</h1>
                <HWList/>
                <IconButton icon="fa fa-wrench" text="Manage"/>
            </div>
        )
    }
}

export default ProjectPreview;