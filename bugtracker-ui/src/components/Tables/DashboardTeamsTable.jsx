import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom"
import { useTeamContext } from "../../contexts/team";
import "./TableProperties.css";


const handleOnRowClick = (rowData) => {
 // console.log("Clicked on row!")
 // console.log(rowData.id)
}

function onRowClick(data) {
 // console.log("Row data below!")
 // console.log(data)
}

function handleNewTeamClick() {
  setDashboardTeamsModal(true)
  //console.log("setDashboardTeamsModal ran")
}

const data = [
  { id: 1, team_name: "We code", members: "Doug Case, Moe Elias"},
  { id: 2, team_name: "React gang", members: "Doug Case, Moe Elias"},
  { id: 3, team_name: "Google", members: "Doug Case, Moe Elias"},
  { id: 4, team_name: "Workday", members: "Doug Case, Moe Elias"},
  { id: 5, team_name: "Codepath", members: "Doug Case, Moe Elias"},
  { id: 6, team_name: "Course Hero", members: "Doug Case, Moe Elias"},
];

const columns = [
  { title: "Id", field: "id", hidden: true},
  { title: "Team Name", field: "name"  /*, render: row => <div onClick={() => console.log(row.id)}>{row.name}</div> */ },
  { title: "Members", field: "members" },
];

export const DashboardTeamsTable = ({dashboardTeamsModal, setDashboardTeamsModal}) => {
  const { teams, setTeamModal } = useTeamContext()
  /* let tableData = []
  let teamMembers = []
  teams.map((team) => (

    team.members.map((member) => {
      apiClient.fetchUserById(member)
      teamMembers.push(apiClient.fetchUserById(member).full_name)
    })
    let obj = {name}
    tableData.push({name: team.name, members: })
  )) */

  return <MaterialTable 
    title="Your Teams" 
    columns={columns} 
    data={teams} 
    actions={[
      {
        icon:()=><button className="tableCreateButton">Create New Team</button>,
        tooltip:"Create a new team",
        onClick: ()=> setTeamModal(true),
        isFreeAction:true,
        position: "toolbar"
      }
    ]}

    onRowClick={(handleOnRowClick, rowData) => onRowClick(rowData)} />
    
};
