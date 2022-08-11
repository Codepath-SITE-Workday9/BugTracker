import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { useProjectContext } from "../../contexts/project";
import "./TableProperties.css";

const columns = [
  { title: "Id", field: "id", hidden: true },
  {
    title: "Project Name",
    field: "name",
    headerStyle: {
      color: 700,
    },
  },
  { title: "Description", field: "description" },
];

export const DashboardProjectsTable = () => {
  const { projects, setProjectModal, setCurrentProject } = useProjectContext();
  const navigate = useNavigate();

  function onRowClick(data) {
    setCurrentProject(data);
    navigate("/projects");
  }

  return (
    <div className="table-container">
      <MaterialTable
        title="Your Projects"
        columns={columns}
        data={projects}
        actions={[
          {
            icon: () => (
              <button className="tableCreateButton">Create New Project</button>
            ),
            tooltip: "Create a new project",
            onClick: () => setProjectModal(true),
            isFreeAction: true,
            position: "toolbar",
          },
        ]}
        options={
          [
            // headerStyle: {}
          ]
        }
        onRowClick={(rowData) => onRowClick(rowData)}
      />
    </div>
  );
};
