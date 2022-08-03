import * as React from "react";
import "./Dashboard.css";
import { useOpenContext } from "../../contexts/open";
import { useProjectContext } from "../../contexts/project";
import { useEffect, useState } from "react";
import renderCharts from "../../services/charts.js";
import { DashboardProjectsTable } from "../Tables/dashboardProjectsTable";
import { DashboardTeamsTable } from "../Tables/DashboardTeamsTable";
import DashboardProjectsModal from "./DashboardProjectsModal/DashboardProjectsModal";
import DashboardTeamsModal from "./DashboardTeamsModal/DashboardTeamsModal";
import apiClient from "../../services/apiClient";
import { useTeamContext } from "../../contexts/team";
import ProjectModal from "../Modals/ProjectModal/ProjectModal";
import TeamModal from "../Modals/TeamModal/TeamModal";
import { useStatisticsContext } from "../../contexts/statistics";

export default function Dashboard() {
  //const { isOpen } = useOpenContext() // Note: Open context is currently lagging dashboard. Fix later
  const { projects, setProjects, fetchProjects, projectModal, setProjectModal } = useProjectContext()
  const {teams, setTeams, fetchTeams, fetchTeamsTableData, teamModal, setTeamModal, clearTeams, getData, newFetchTeamsTableData} = useTeamContext()
  const { dashboardStatistics, setDashboardStatistics, fetchDashboardStatistics } = useStatisticsContext()
  const [dashboardProjectsModal, setDashboardProjectsModal] = useState(false)
  const [dashboardTeamsModal, setDashboardTeamsModal] = useState(false)
  const [teamsTableData, setTeamsTableData] = useState([])
  //const [dashboardStatistics, setDashboardStatistics] = useState({})

  //fetchProjects()
  

  // const fetchDashboardStatistics = async () => {
  //   //setIsLoading(true);
  //   let stats = await apiClient.getAllStatistics()
  //   console.log("fetchDashboardStatistics stats:", stats)
  //   setDashboardStatistics(stats)
  //   console.log("fetchDashboardStatistics dashboardStatistics:", dashboardStatistics)
  //   //setIsLoading(false);
  // };

  async function getTeamsTable() {
    // console.log("Teams length:", teams.length)
    setTeamsTableData([])
    
    
    let teamIds = []
    teams.map(async (team) => {
      const memberList = await apiClient.fetchMemberList(team.id)
      teamIds.push(team.id)
      // console.log("Inside memberList")
      // console.log(memberList.data.members);
      let memberNames = []
      memberList?.data?.members.map((member) => {
        memberNames.push(member.full_name)
      }) 
      
      //let new_team = {id: team.id, name: team.name, members: memberNames.join(", ")}
      //console.log("old_team", tableData)
      //console.log("new_team", new_team)

      /*let id = 1
      var exists = false //tableData.find(check.id === id)
      ids.forEach((id) => {
        if (teamsTableData.find(exists.id === id) !== undefined) {
          exists = true
        }
      }) */
      //let exists = idExists(team.id)
      //console.log("exists", exists)
      /* teamsTableData.some(element => {
        if (element.id === team.id) {
          exists = true;
        }
    
        exists = false;
      }); */

      //if (!exists) {

        //let fillerData = () => [...teamsTableData, {id: team.id, name: team.name, members: memberNames.join(", ")}]
        //console.log(fillerData)
        setTeamsTableData(prev => [...prev, {id: team.id, name: team.name, members: memberNames.join(", ")}]);
        //setIds(prev => [...prev, team.id])
      //} 
    })
    //console.log("teamIds:", teamIds)
    //const teamData = await apiClient.fetchTeamMembers(teamIds)
    //console.log("teamData:", teamData)

    //console.log("tableData below")
    //console.log(tableData)

    //setIsLoading(false) 
  }


  window.onload = function () {
    //getTeamsTable()
    //console.log("Inside window.onload")
    fetchDashboardStatistics()
    //console.log("Fetched dashboard statistics onload complete")
    //renderCharts(dashboardStatistics)
  }

  useEffect(() => {
     //clearTeams()

     fetchDashboardStatistics()
     //console.log("dashboard statistics:", dashboardStatistics)
     renderCharts(dashboardStatistics)
     //console.log("dashboard statistics:", dashboardStatistics)
     //renderCharts(dashboardStatistics)

    //  if (dashboardStatistics) {
    //   fetchDashboardStatistics()
    //   console.log("Dashboard dashboardStatistics:", dashboardStatistics)
    //   renderCharts(dashboardStatistics)
    // }

     //fetchProjects()
     //newFetchTeamsTableData(teams)
     //fetchTeams()
     //getTeamsTable()
     //getData()
     //fetchTeamsTableData()
     //setProjects(apiClient.listAllProjects())
     //setTeams(apiClient.listAllTeams())


     //console.log("Projects below")
     //console.log(projects)
     //console.log("Teams below")
     //console.log(teams) 
  }, [])

  //  if (dashboardStatistics) {
  //    //fetchDashboardStatistics()
  //    console.log("Dashboard dashboardStatistics:", dashboardStatistics)
  //    renderCharts(dashboardStatistics)
  //  }
 



  return (
    // <div className={isOpen ? "dashboard open" : "dashboard closed"}>
    <div className="dashboard closed">

      {projectModal && <ProjectModal setDashboardProjectsModal={setDashboardProjectsModal} />}
      {teamModal && <TeamModal setDashboardTeamsModal={setDashboardTeamsModal} getTeamsTable={getTeamsTable} />}
      <div className={projectModal|| teamModal ? "blur" : "clear"}>

        {/*Renders a table for projects on the dashboard */}
        <DashboardProjectsTable
          dashboardProjectsModal={dashboardProjectsModal}
          setDashboardProjectsModal={setDashboardProjectsModal}
        />

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
        <DashboardTeamsTable
          dashboardTeamsModal={dashboardTeamsModal}
          setDashboardTeamsModal={setDashboardTeamsModal}
          //teamsTableData={teamsTableData}
          //setTeamsTableData={setTeamsTableData}
          getTeamsTable={getTeamsTable}
          teams={teams}
        />
      </div>
    </div>
  );
}
