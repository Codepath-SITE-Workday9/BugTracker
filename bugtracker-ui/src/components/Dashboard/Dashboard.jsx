import * as React from "react";
import "./Dashboard.css";
import { useOpenContext } from "../../contexts/open";
import { useEffect, useState } from "react";
import renderCharts from "../../services/charts.js";
import { DashboardProjectsTable } from "../Tables/dashboardProjectsTable";
//import MaterialTable from 'material-table';
import { DashboardTeamsTable } from "../Tables/DashboardTeamsTable";
import DashboardProjectsModal from "./DashboardProjectsModal/DashboardProjectsModal";
import DashboardTeamsModal from "./DashboardTeamsModal/DashboardTeamsModal";
import { useProjectContext } from "../../contexts/project";
import apiClient from "../../services/apiClient";

export default function Dashboard() {
  const { isOpen } = useOpenContext() // Note: Open context is currently lagging dashboard. Fix later
  const { projects, setProjects } = useProjectContext()
  const [dashboardProjectsModal, setDashboardProjectsModal] = useState(false)
  const [dashboardTeamsModal, setDashboardTeamsModal] = useState(false)

  useEffect(() => {
     renderCharts()
     setProjects(apiClient.getAllProjects())
     console.log(projects)
  }, [])

  return (
    <div className={isOpen ? "dashboard open" : "dashboard closed"}>

      {dashboardProjectsModal && <DashboardProjectsModal setDashboardProjectsModal={setDashboardProjectsModal} />}
      {dashboardTeamsModal && <DashboardTeamsModal setDashboardTeamsModal={setDashboardTeamsModal} />}
      <div className={dashboardProjectsModal || dashboardTeamsModal ? "blur" : "clear"}>

        {/*Renders a table for projects on the dashboard */}
        <DashboardProjectsTable dashboardProjectsModal={dashboardProjectsModal} setDashboardProjectsModal={setDashboardProjectsModal}/> 

        <div className="ticket-statistics">
          <h>TICKET STATISTICS</h>
          <div className="statistics-row">
            <div className="chart-container">
              <canvas // Renders a donut chart for category statistics
                className="donut-chart"
                id="category-chart"
                //width="20%"
                //height="auto"
                //maintainAspectRatio={false}
                //width="800"
                //height="450"
              ></canvas>
            </div>
            <br />
            <div className="chart-container">
              <canvas // Renders a donut chart for status statistics
                className="donut-chart"
                id="status-chart"
                //maintainAspectRatio={false}
                //width="20%"
                //height="auto"
                //width="800"
                //height="450"
              ></canvas>
            </div>
            <br />
            <div className="chart-container">
              <canvas // Renders a donut chart for priority statistics
                className="donut-chart"
                id="priority-chart"
                //maintainAspectRatio={false}
                //width="20%"
                //height="auto"
                //width="800"
                //height="450"
              ></canvas>
            </div>
          </div>
        </div>

        {/*Renders a table for teams on the dashboard */}
        <DashboardTeamsTable dashboardTeamsModal={dashboardTeamsModal} setDashboardTeamsModal={setDashboardTeamsModal}/> 
      </div>
    </div>
  );
}