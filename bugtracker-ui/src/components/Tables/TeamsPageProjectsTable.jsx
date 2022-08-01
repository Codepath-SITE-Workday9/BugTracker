import MaterialTable from "material-table";
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import { useProjectContext } from "../../contexts/project";
import { useNavigate } from "react-router-dom";

const columns = [
  { title: "Id", field: "id", hidden: true },
  { title: "Project Name", field: "name" },
  { title: "Description", field: "description" },
  { title: "Collaborators", field: "collaborators" },
];

export const TeamsPageProjectsTable = ({ currentTeam }) => {
  const [projects, setProjects] = useState([]);
  const { setCurrentProject } = useProjectContext();

  const navigate = useNavigate();

  const fetchProjects = async () => {
    const { data, error } = await apiClient.fetchProjectList(currentTeam.id);
    if (data) {
      setProjects(data);
    }
  };

  const onRowClick = (rowData) => {
    setCurrentProject(rowData);
    navigate("/projects");
  };

  useEffect(() => {
    if (currentTeam) {
      fetchProjects();
    }
  }, [currentTeam]);

  return (
    <MaterialTable
      title="Projects assigned to the team"
      columns={columns}
      data={projects.projects}
      onRowClick={(handleOnRowClick, rowData) => onRowClick(rowData)}
    />
  );
};
