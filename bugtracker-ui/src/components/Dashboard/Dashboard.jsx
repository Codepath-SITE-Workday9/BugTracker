import * as React from "react";
import "./Dashboard.css";
import { useOpenContext } from "../../contexts/open";
import "../../services/charts.js"

export default function Dashboard() {
  const { isOpen } = useOpenContext();
  return (
    <div className={isOpen ? "dashboard open" : "dashboard closed"}>
      <div className="projects-table">
        <div className="header-row">
          <h>YOUR PROJECTS</h>
          <div className="project-search">
            <div className="input-group">
              <input type="text" className="project-input" placeholder="Search . . ."/>
              <span class="material-symbols-outlined">
                close
              </span>
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

          </div>
          <div className="create-project"></div>
        </div>

      </div>

      <div className="ticket-statistics">
        <h>TICKET STATISTICS</h>
        <div className="statistics-row">
          <div className="statistic-element">
            <canvas className="donut-chart" id="doughnut-chart" width="800" height="450"></canvas>
          
          </div>
        </div>
      </div>
    

      <div className="teams-table">
        <div className="header-row">
            <h>YOUR TEAMS</h>
            <div className="project-search">
              <div className="input-group">
                <input type="text" className="project-input" placeholder="Search . . ."/>
                <span class="material-symbols-outlined">
                  close
                </span>
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
            <div className="page-search">

            </div>
            <div className="create-project"></div>
          </div>
      </div>
    </div>
  );
}
