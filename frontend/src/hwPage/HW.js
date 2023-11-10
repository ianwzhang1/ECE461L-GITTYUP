
import './hw.css';
import { Navbar } from "../navBar/Navbar.js";
import {ProjectFrame} from './ProjectFrame.js';
import { CommentsPage } from './ProjectFrame.js';

function HW() {
  return (
    <div className="HW">
      <div className="frame">
        <div className="pageDiv">
          <div className="pageTitle">MyProject</div>
        </div>
        <div className="bar-group">
          <Navbar />
        </div>
        <div className="project-frame">
          <ProjectFrame />
          <CommentsPage />
        </div>

      </div>
    </div>
  );
}

export default HW;
