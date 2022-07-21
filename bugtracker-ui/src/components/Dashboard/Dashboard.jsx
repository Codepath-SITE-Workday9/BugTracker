import * as React from "react";
import "./Dashboard.css";
import { useOpenContext } from "../../contexts/open";
import { useEffect } from "react";
import "../../services/charts.js";
// import { BasicTable } from "../Tables/BasicTable";
//import MaterialTable from 'material-table';
import { data } from "../../sampleData";

export default function Dashboard() {
  const { isOpen } = useOpenContext();
  /* useEffect(() => {
    const script = document.createElement("script")
    script.src = "../../services/charts.js"
    script.async = true;
    script.onload = () => this.scriptLoaded()

    document.body.appendChild(script)
    
  }); */

  return (
    <div className={isOpen ? "dashboard open" : "dashboard closed"}>
      <div className="projects-table">
        <div className="header-row">
          <h>YOUR PROJECTS</h>
          <div className="project-search">
            <div className="input-group">
              <input
                type="text"
                className="project-input"
                placeholder="Search . . ."
              />
              <span class="material-symbols-outlined">close</span>
              <span className="material-symbols-outlined">search</span>
            </div>
          </div>
        </div>
        <div className="table">
          <div className="table-header-row">
            <th>PROJECT NAME</th>
            <th>DESCRIPTION</th>
            <th>COLLABORATORS</th>
          </div>
          <div className="table-content-row">
            <th>Bug Tracker Project</th>
            <th>A project for making a bug tracker</th>
            <th>Doug Case, Moe Elias</th>
          </div>
          <div className="table-content-row">
            <th>Lifetracker</th>
            <th>A project for making a life tracker</th>
            <th>Doug Case, Moe Elias</th>
          </div>
          <div className="table-content-row">
            <th>Flixster</th>
            <th>A project for making a movie finder app</th>
            <th>Doug Case, Moe Elias</th>
          </div>
          <div className="table-content-row">
            <th>Student Store</th>
            <th>A project for making a simple student store</th>
            <th>Doug Case, Moe Elias</th>
          </div>
          <div className="table-content-row">
            <th>Stock App</th>
            <th>A project for tracking different stocks</th>
            <th>Doug Case, Moe Elias</th>
          </div>
        </div>

        <div className="projects-footer">
          <div className="page-search">
            <button className="back-button-double">&larr; &larr;</button>
            <button className="back-button">&larr;</button>
            <button className="page-button-1">1</button>
            <button className="page-button-2">2</button>
            <button className="page-button-3">3</button>
            <button className="forward-button">&rarr;</button>
            <button className="forward-button-double">&rarr; &rarr;</button>
            <input className="project-table-page-search"></input>
            <button className="project-table-page-go">Go</button>
          </div>

          <div className="create-project">
            <button className="create-project-button">Create Project</button>
          </div>
        </div>
      </div>

      <div className="ticket-statistics">
        <h>TICKET STATISTICS</h>
        <div className="statistics-row">
          <canvas
            className="donut-chart"
            id="category-chart"
            width="800"
            height="450"
          ></canvas>
          <br />
          <canvas
            className="donut-chart"
            id="status-chart"
            width="800"
            height="450"
          ></canvas>
          <br />
          <canvas
            className="donut-chart"
            id="priority-chart"
            width="800"
            height="450"
          ></canvas>
        </div>
      </div>

      <div className="teams-table">
        <div className="header-row">
          <h>YOUR TEAMS</h>
          <div className="project-search">
            <div className="input-group">
              <input
                type="text"
                className="project-input"
                placeholder="Search . . ."
              />
              <span class="material-symbols-outlined">close</span>
              <span className="material-symbols-outlined">search</span>
            </div>
          </div>
        </div>
        <div className="table">
          <div className="table-header-row">
            <th>TEAM NAME</th>
            <th>COLLABORATORS</th>
          </div>
          <div className="table-content-row">
            <th>Bug Tracker Project</th>
            <th>Doug Case, Moe Elias</th>
          </div>
          <div className="table-content-row">
            <th>Lifetracker</th>

            <th>Doug Case, Moe Elias</th>
          </div>
          <div className="table-content-row">
            <th>Flixster</th>

            <th>Doug Case, Moe Elias</th>
          </div>
          <div className="table-content-row">
            <th>Student Store</th>

            <th>Doug Case, Moe Elias</th>
          </div>
          <div className="table-content-row">
            <th>Stock App</th>

            <th>Doug Case, Moe Elias</th>
          </div>
        </div>

        <div className="projects-footer">
          <div className="page-search"></div>
          <div className="create-project"></div>
        </div>

        <div className="projects-footer">
          <div className="page-search">
            <button className="back-button-double">&larr; &larr;</button>
            <button className="back-button">&larr;</button>
            <button className="page-button-1">1</button>
            <button className="page-button-2">2</button>
            <button className="page-button-3">3</button>
            <button className="forward-button">&rarr;</button>
            <button className="forward-button-double">&rarr; &rarr;</button>
            <input className="project-table-page-search"></input>
            <button className="project-table-page-go">Go</button>
          </div>

          <div className="create-team">
            <button className="create-team-button">Create Team</button>
          </div>
        </div>
      </div>
      <BasicTable />
    </div>
  );
}
