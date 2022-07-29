import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
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
  { title: "Id", field: "id", hidden: true },
  { title: "Team Name", field: "team_name" },
  { title: "Members", field: "members" },
];

export const DashboardTeamsTable = ({
  dashboardTeamsModal,
  setDashboardTeamsModal,
}) => {
  return (
    <MaterialTable
      title="Your Teams"
      columns={columns}
      data={data}
      actions={[
        {
          icon: () => (
            <button className="tableCreateButton">Create New Team</button>
          ),
          tooltip: "Create a new team",
          onClick: () => setDashboardTeamsModal(true), // Revert to true when implemented
          isFreeAction: true,
          position: "toolbar",
        },
      ]}
      onRowClick={(handleOnRowClick, rowData) => onRowClick(rowData)}
    />
  );
};
