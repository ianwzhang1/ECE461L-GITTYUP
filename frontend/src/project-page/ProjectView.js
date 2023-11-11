import React, { useContext, useEffect, useState } from "react";
import "./ProjectView.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import SignupForm from "../signup-page/SignupForm";
import IconButton from "../components/IconButton";
import Project from "../data/Project";
import HW from "../data/HW";
import { current_user } from "../backendLinker/BackendLink";
import { UserContext, getCurrentUser } from "../App";
import BackendLink, {
  get,
  post,
  request,
  setCurrentUser,
} from "../backendLinker/BackendLink";

function getProjectFromDatabase(pid, calbackFX) {
  get("proj/info", getCurrentUser(), {
    pid: pid,
  }).then(async (response) => {
    let json = await response.json();
    if (response.status !== 200) {
      alert(json.message);
      return;
    }
    let checkedoutItems = json["checked_out"];
    const projectName = json["name"];
    let hardwareList = [];
    for (const itemId in checkedoutItems) {
      if (!checkedoutItems.hasOwnProperty(itemId)) {
        continue;
      }
      const hsetData = checkedoutItems[itemId];
      const hardwareName = hsetData["name"];
      const hardwareQuant = hsetData["quant"];
      const hid = itemId;
      const hardware = new HW(hardwareName, hardwareQuant, hid);
      hardwareList.push(hardware);
    }
    const project = new Project(pid, projectName, hardwareList);
    calbackFX(project);
  });
}

function ProjectView(props) {
  let navigate = useNavigate(); // For redirections
  let params = useParams();
  let location = useLocation();
  const [project, setProject] = useState(
    new Project("", "Loading, please wait", [])
  );

  // The project path is located at params['pid']. Use this to get more detailed info about the project.
  let pid = params["pid"];

  getProjectFromDatabase(pid, setProject);

  let addCollaborator = () => {
    let collaborator = document.getElementById("collaborator-input");
    console.log(collaborator.value); // This gets the input
  };

  let currentUser = getCurrentUser();

  return (
    <div className="app">
      <div className="header">
        <PageTitle icon="fa fa-file" text="Project" />
      </div>
      <div className="dashboard-login vertical-tiled">
        <h1>{project.name}</h1>
        <div className="table-wrapper">
          <table className="fl-table">
            <thead>
              <tr>
                <th>Hardware</th>
                <th>Description</th>
                <th>Availability</th>
                <th>Modify Checked Out</th>
              </tr>
            </thead>
            <tbody>
              {project.hw.map((hardware) => (
                // TODO: Get details about hardware to find out description and total availability, since this is not in the project
                <tr>
                  <td>{hardware.name}</td>
                  <td>{"Description"}</td>
                  <td>{"Availability"}</td>
                  <td>
                    <div className="pill-box">
                      <input
                        className="qty-input"
                        value={hardware.amount}
                      ></input>{" "}
                      <input
                        className="qty-input"
                        id={hardware.name + "input"}
                      ></input>{" "}
                      <button
                        className="small-button"
                        onClick={() => {
                          const input_box = document.getElementById(
                            hardware.name + "input"
                          );
                          const amount = input_box.value;

                          post("proj/checkout", currentUser, {
                            pid: pid,
                            hid: hardware.id,
                            quant: parseInt(amount),
                          }).then(async (response) => {
                            let json = await response.json();
                            if (response.status !== 200) {
                              alert(json.message);
                            } else {
                              //   getProjectFromDatabase(pid, setProject);
                            }
                          });
                        }}
                      >
                        Apply
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <IconButton
        onClick={() => navigate("/projects")}
        text="Back to Projects"
      />
      {false ? (
        <div>
          <br />
          <h1>Admin Controls</h1>
          <input id="collaborator-input" className="name-input"></input>
          <IconButton
            onClick={() => addCollaborator()}
            icon="fa fa-plus"
            text="Add Collaborator"
          />
        </div>
      ) : null}
    </div>
  );
}

export default ProjectView;
