import { red } from "@material-ui/core/colors";
import MaterialTable from "material-table";
import { MTableToolbar } from "material-table";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProjectContext } from "../../contexts/project";
import "./TableProperties.css";

const handleOnRowClick = (rowData) => {};




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
    field:
      "name" /*, render: row => <div onClick={() => console.log(row.id)}>{row.name}</div> */,
    headerStyle: {
      color: 700
    }
  },
  { title: "Description", field: "description" },
  { title: "Collaborators", field: "collaborators" },
];

export const DashboardProjectsTable = ({dashboardProjectsModal, setDashboardProjectsModal}) => {
  const { projects, setProjects, fetchProjects, projectModal, setProjectModal } = useProjectContext()
  const navigate = useNavigate()

  function onRowClick(data) {
    console.log("clicked row")
    navigate('/tickets')
  }

  return (
    <div className="table-container">
      <MaterialTable
        title="Your Projects"
        columns={columns}
        data={projects}
        actions={[
          {
            icon:()=><button className="tableCreateButton">Create New Project</button>,
            tooltip:"Create a new project",
            onClick: ()=> setProjectModal(true),
            isFreeAction:true,
            position: "toolbar"
          }
        ]}

        options={[
          // headerStyle: {}
        ]}

        onRowClick={(handleOnRowClick, rowData) => onRowClick(rowData)}
      />
    </div>
  );
};
