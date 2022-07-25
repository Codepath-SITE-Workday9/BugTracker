import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";

const handleOnRowClick = (rowData) => {};

function onRowClick(data) {}

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
    field:
      "project_name" /*, render: row => <div onClick={() => console.log(row.id)}>{row.name}</div> */,
  },
  { title: "Description", field: "description" },
  { title: "Collaborators", field: "collaborators" },
];

export const DashboardProjectsTable = () => {
  return (
    <MaterialTable
      title="Your Projects"
      columns={columns}
      data={data}
      onRowClick={(handleOnRowClick, rowData) => onRowClick(rowData)}
    />
  );
};
