import * as React from "react";
import "./Dashboard.css";
import { useProjectContext } from "../../contexts/project";
import { useEffect, useState } from "react";
import { DashboardProjectsTable } from "../Tables/dashboardProjectsTable";
import { DashboardTeamsTable } from "../Tables/DashboardTeamsTable";
import apiClient from "../../services/apiClient";
import { useTeamContext } from "../../contexts/team";
import ProjectModal from "../Modals/ProjectModal/ProjectModal";
import TeamModal from "../Modals/TeamModal/TeamModal";
import { useStatisticsContext } from "../../contexts/statistics";
import { useTicketContext } from "../../contexts/ticket";
import renderCharts from "../../services/charts.js";

export default function Dashboard() {
  const { projectModal } = useProjectContext();
  const { teams, teamModal, newFetchTeamsTableData } = useTeamContext();
  const {
    fetchDashboardStatistics,
    isLoading,
    dashboardStatistics,
    rendered,
    setRendered,
  } = useStatisticsContext();
  const { tickets, fetchAllTickets } = useTicketContext();
  const [dashboardProjectsModal, setDashboardProjectsModal] = useState(false);
  const [dashboardTeamsModal, setDashboardTeamsModal] = useState(false);
  const [setTeamsTableData] = useState([]);

  async function getTeamsTable() {
    setTeamsTableData([]);
    let teamIds = [];
    teams.map(async (team) => {
      const memberList = await apiClient.fetchMemberList(team.id);
      teamIds.push(team.id);
      let memberNames = [];
      memberList?.data?.members.map((member) => {
        memberNames.push(member.full_name);
      });
      setTeamsTableData((prev) => [
        ...prev,
        { id: team.id, name: team.name, members: memberNames.join(", ") },
      ]);
    });
  }

  useEffect(() => {
    fetchAllTickets();
    console.log("Rendered:", rendered);
    // if (rendered) {
    //   fetchDashboardStatistics();
    // } else {
    renderCharts(dashboardStatistics);
    // }
    // fetchDashboardStatistics();

    newFetchTeamsTableData(teams);
    console.log("IN the dashboard useeffect");
  }, []);

  return (
    <div className="dashboard closed">
      {projectModal && (
        <ProjectModal setDashboardProjectsModal={setDashboardProjectsModal} />
      )}
      {teamModal && (
        <TeamModal
          setDashboardTeamsModal={setDashboardTeamsModal}
          getTeamsTable={getTeamsTable}
        />
      )}
      <div className={projectModal || teamModal ? "blur" : "clear"}>
        <div className="ticket-statistics">
          <h>Ticket Statistics</h>
          {tickets.length > 0 ? (
            isLoading ? (
              <h1> Loading </h1>
            ) : (
              <div className="statistics-row">
                <div className="chart-container">
                  <canvas // Renders a donut chart for category statistics
                    className="donut-chart"
                    id="category-chart"
                  ></canvas>
                </div>
                <br />
                <div className="chart-container">
                  <canvas // Renders a donut chart for status statistics
                    className="donut-chart"
                    id="status-chart"
                  ></canvas>
                </div>
                <br />
                <div className="chart-container">
                  <canvas // Renders a donut chart for priority statistics
                    className="donut-chart"
                    id="priority-chart"
                  ></canvas>
                </div>
              </div>
            )
          ) : (
            <h1>NO STATISTICS TO SHOW</h1>
          )}
        </div>

        <div className="table-row">
          {/*Renders a table for teams on the dashboard*/}
          <div className="teams-table">
            <DashboardTeamsTable
              dashboardTeamsModal={dashboardTeamsModal}
              setDashboardTeamsModal={setDashboardTeamsModal}
              getTeamsTable={getTeamsTable}
              teams={teams}
            />
          </div>

          {/* Renders table for projects on the dashboard */}
          <div className="projects-table">
            <DashboardProjectsTable
              dashboardProjectsModal={dashboardProjectsModal}
              setDashboardProjectsModal={setDashboardProjectsModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
