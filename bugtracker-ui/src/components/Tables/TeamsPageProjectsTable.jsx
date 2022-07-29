import MaterialTable from "material-table";
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";

const data = [
  {
    id: 1,
    project_name: "Bug tracker",
    description: "A bug tracking software",
    collaborators: "Doug Case, Moe Elias",
  },
  {
    id: 2,
    project_name: "Flixster",
    description: "A movie finder app",
    collaborators: "Doug Case, Moe Elias",
  },
  {
    id: 3,
    project_name: "Student Store",
    description: "A simple student store app",
    collaborators: "Doug Case, Moe Elias",
  },
  {
    id: 4,
    project_name: "Lifetracker",
    description: "A life tracking app",
    collaborators: "Doug Case, Moe Elias",
  },
];

const columns = [
  { title: "Id", field: "id", hidden: true },
  {
    title: "Project Name",
    field: "project_name",
    headerStyle: {
      color: 700,
    },
  },
  { title: "Description", field: "description" },
  { title: "Collaborators", field: "collaborators" },
];

export const TeamsPageProjectsTable = ({ currentTeam }) => {
  const [projects, setProjects] = useState([]);
  const fetchProjects = async () => {
    const { data, error } = await apiClient.fetchProjectList(currentTeam.id);
    if (data) {
      setProjects(data);
    }
  };

  useEffect(() => {
    if (currentTeam) {
      fetchProjects();
      console.log(projects);
    }
  }, [currentTeam]);

  return (
    <MaterialTable
      title="Projects assigned to the team"
      columns={columns}
      data={projects.projects}
    />
  );
};
