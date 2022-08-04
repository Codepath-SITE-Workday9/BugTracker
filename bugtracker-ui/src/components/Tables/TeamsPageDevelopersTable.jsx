import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

const columns = [
  { title: "Id", field: "id", hidden: "true" },
  { title: "Name", field: "full_name" }
  //{ title: "Role", field: "role" },
  //{ title: "Number of open tickets", field: "numtickets" }, Note: re-open this column if we have time
];

export const TeamsPageDevelopersTable = ({ currentTeam, handleOnAddNewMember }) => {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    const { data, error } = await apiClient.fetchMemberList(currentTeam.id);
    if (data) {
      setMembers(data);
    }
  };

  useEffect(() => {
    if (currentTeam) {
      fetchMembers();
    }
  }, [currentTeam, handleOnAddNewMember]);

  return (
    <MaterialTable
      title="Developers on the team"
      columns={columns}
      data={members.teamsData}
    />
  );
};
