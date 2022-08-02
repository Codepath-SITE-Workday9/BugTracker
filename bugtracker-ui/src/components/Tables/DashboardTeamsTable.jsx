import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react";
import { useTeamContext } from "../../contexts/team";
import apiClient from "../../services/apiClient";
import "./TableProperties.css";

function handleNewTeamClick() {
  setDashboardTeamsModal(true);
}

const data = [
  { id: 1, team_name: "We code", members: "Doug Case, Moe Elias" },
  { id: 2, team_name: "React gang", members: "Doug Case, Moe Elias" },
  { id: 3, team_name: "Google", members: "Doug Case, Moe Elias" },
  { id: 4, team_name: "Workday", members: "Doug Case, Moe Elias" },
  { id: 5, team_name: "Codepath", members: "Doug Case, Moe Elias" },
  { id: 6, team_name: "Course Hero", members: "Doug Case, Moe Elias" },
];

const columns = [
  { title: "Id", field: "teamId", hidden: true},
  { title: "Team Name", field: "teamName"  /*, render: row => <div onClick={() => console.log(row.id)}>{row.name}</div> */ },
  { title: "Members", field: "members" },
];

export const DashboardTeamsTable = ({dashboardTeamsModal, setDashboardTeamsModal, setTeamsTableData, getTeamsTable}) => {
  const { teams, setTeams, setTeamModal, fetchTeamsTableData, teamsTableData, getData} = useTeamContext()
  //const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [ids, setIds] = useState([])
  const didMount = useRef(false)

    // 3 steps to fix:
    // 1. move work to backend api if we can
    // 2. try promise all approach (use an array of promises to fetch them all at once)
    // 3. try sets

    /* function getData() {
      console.log("Teams length:", teams.length)
      teams.map(async (team) => {
        const memberList = await apiClient.fetchMemberList(team.id)
        console.log("Inside memberList")
        console.log(memberList.data.members);
        let memberNames = []
        memberList?.data?.members.map((member) => {
          memberNames.push(member.full_name)
        }) 
        
        let new_team = {id: team.id, name: team.name, members: memberNames.join(", ")}
        console.log("old_team", tableData)
        console.log("new_team", new_team)
        let id = 1

        var exists = false //tableData.find(check.id === id)
        ids.forEach((id) => {
          if (tableData.find(exists.id === id) !== undefined) {
            exists = true
          }
        })

        if (!exists) {
          setTableData(prev => [...prev, {id: team.id, name: team.name, members: memberNames.join(", ")}])
          setIds(prev => [...prev, team.id])
        }
      })

      console.log("tableData below")
      console.log(teamsTableData)
      setIsLoading(false) 
    } */

    window.onload = function () {
      //getData()
      //getTeamsTable()
    }


  
    useEffect(() => {
      //console.log("Inside teams table useEffect")
      //setTableData([])

      //getTeamsTable()

      // if (!didMount.current) {
      //   return didMount.current = true
      // }


      //if (tableData.length < 1) {

        //getData() 

      //}
      /*console.log("Inside useEffect")
      fetchTeamsTableData()
      console.log(teamsTableData)
      setTableData(teamsTableData)
      console.log(tableData)*/
      
      //const tableData = []
      
      /* ~~~~~~~~~~~~~~~~~~~~~~~~~
      setTableData([])
      teams.map(async (team) => {
        const memberList = await apiClient.fetchMemberList(team.id)
        console.log("Inside memberList")
        console.log(memberList.data.members);
        let memberNames = []
        memberList?.data?.members.map((member) => {
          memberNames.push(member.full_name)
        })
        setTableData(prev => [...prev, {id: team.id, name: team.name, members: memberNames.join(", ")}])
      })

      console.log("tableData below")
      console.log(tableData)
      setIsLoading(false) ~~~~~~~~~~~~~~~~~~~~~ */

      /*console.log("Inside fetchTeamsTableData")
      console.log(teams)
      //const tableData = []
      setTeamsTableData([])
      teams.map(async (team) => {
        const memberList = await apiClient.fetchMemberList(team.id)
        console.log("memberList below")
        console.log(memberList)
        //let memberNames = [];
        
          console.log("Inside memberList")
          console.log(memberList.data.members);
          let memberNames = []
          memberList?.data?.members.map((member) => {
            memberNames.push(member.full_name)
          })
          console.log("MemberNames below")
          console.log(memberNames)
          console.log(memberNames.join(", "))
  
          //tableData.push({id: team.id, name: team.name, members: "testMembers"/*memberNames.join(", ") }
          await setTeamsTableData(prev => [...prev, {id: team.id, name: team.name, members: memberNames.join(", ")}])
          console.log("Teamstabledata below")
          console.log(teamsTableData) */
      
        //tableData.push({id: team.id, name: team.name, members: memberNames.join(", ") })
        /*let memberNames = []
        memberList.map((member) => {
          memberNames.push(member.name)
        }) 
        /*tableData.push({id: team.id, name: team.name/*, members: memberNames.join(", ") }) */
      }, [])
     
/*
    const tableData = []
    tableData.push({id: 999, name: "testName", members: ""})
    teams.map((team) => {
      let memberList = apiClient.fetchMemberList(team.id)
      //let memberNames = [];
      .then((memberList) => {
        console.log("Inside memberList")
        console.log(memberList.data.members);
        let memberNames = []
        memberList.data.members.map((member) => {
          memberNames.push(member.full_name)
        })
        tableData.push({id: team.id, name: team.name, members: "testMembers"/*memberNames.join(", ") })
      })
      .catch((error) => {
        console.log(error);
      });
      //tableData.push({id: team.id, name: team.name, members: memberNames.join(", ") })
      /*let memberNames = []
      memberList.map((member) => {
        memberNames.push(member.name)
      }) 
      /*tableData.push({id: team.id, name: team.name/*, members: memberNames.join(", ") }) 
    })
    console.log("tableData below")
    console.log(tableData) */

    
  
  return (
    <MaterialTable
      title="Your Teams"
      columns={columns}
      data={teamsTableData}
      actions={[
        {
          icon: () => (
            <button className="tableCreateButton">Create New Team</button>
          ),
          tooltip: "Create a new team",
          onClick: () => setTeamModal(true),
          isFreeAction: true,
          position: "toolbar",
        },
      ]}
      onRowClick={(handleOnRowClick, rowData) => onRowClick(rowData)}
    />
  );
};
