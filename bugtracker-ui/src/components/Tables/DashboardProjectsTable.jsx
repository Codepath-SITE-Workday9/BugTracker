import { red } from "@material-ui/core/colors";
import MaterialTable from "material-table";
import { MTableToolbar } from "material-table";
import { useNavigate } from "react-router-dom";
import "./TableProperties.css";

const handleOnRowClick = (rowData) => {};

function onRowClick(data) {}

const sampleData = [
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

export const DashboardProjectsTable = ({
  dashboardProjectsModal,
  setDashboardProjectsModal,
}) => {
  return (
    <div className="table-container">
      <MaterialTable
        title="Your Projects"
        columns={columns}
        data={sampleData}
        actions={[
          {
            icon: () => (
              <button className="tableCreateButton">Create New Project</button>
            ),
            tooltip: "Create a new project",
            onClick: () => setDashboardProjectsModal(true),
            isFreeAction: true,
            position: "toolbar",
          },
        ]}
        options={
          [
            // headerStyle: {}
          ]
        }
        onRowClick={(handleOnRowClick, rowData) => onRowClick(rowData)}
      />
    </div>
  );
};
