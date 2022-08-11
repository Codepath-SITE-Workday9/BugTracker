import MaterialTable from "material-table";
import "./TableProperties.css";
import { useNavigate } from "react-router-dom";
import { useTeamContext } from "../../contexts/team";

const columns = [
  { title: "Id", field: "teamId", hidden: true },
  {
    title: "Team Name",
    field: "teamName",
  },
  { title: "Members", field: "members" },
];

export const DashboardTeamsTable = () => {
  const { setTeamModal, setCurrentTeam, teamsTableData } = useTeamContext();

  const navigate = useNavigate();
  function onRowClick(data) {
    setCurrentTeam(data);
    navigate("/teams");
  }

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
      onRowClick={(rowData) => onRowClick(rowData)}
    />
  );
};
