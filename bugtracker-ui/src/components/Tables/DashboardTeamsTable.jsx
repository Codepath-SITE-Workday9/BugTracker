import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { useTeamContext } from "../../contexts/team";
import apiClient from "../../services/apiClient";
import { useEffect, useState } from "react";
import "./TableProperties.css";

function handleNewTeamClick() {
  setDashboardTeamsModal(true);
}

export const DashboardTeamsTable = ({}) => {
  const { teams, setTeamModal } = useTeamContext();
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState([]);

  const columns = [
    { title: "Id", field: "id", hidden: true },
    {
      title: "Team Name",
      field: "name",
    },
    {
      title: "Members",
      field: "members",
      render: (rowData) => <div> {members[rowData.id]} </div>,
    },
  ];

  const memberArray = async () => {
    setIsLoading(true);

    teams.map(async (t) => {
      const { data, error } = await apiClient.fetchMemberList(t.id);
      let users = "";
      if (data) {
        data.members.map((mem) => (users = users = ", " + mem.full_name));
        members.push(users);
      } else {
        return error;
      }
    });

    setIsLoading(false);
  };

  useEffect(() => {
    memberArray();
  }, [teams]);

  return isLoading ? (
    <></>
  ) : (
    <MaterialTable
      title="Your Teams"
      columns={columns}
      data={teams}
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
