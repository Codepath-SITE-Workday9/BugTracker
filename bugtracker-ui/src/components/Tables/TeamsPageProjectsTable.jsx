/**
 * USE THIS AS A TEMPLATE FOR CREATING NEW TABLES
 *
 *
 */

import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";

// IGNORE THIS
const handleOnRowClick = (rowData) => {
  console.log("Clicked on row!");
  console.log(rowData.id);
};

/**
 * Gets called when a row is clicked.
 * Takes the data of the row and console logs it.
 * You can use this data to pull id or anything else you want,
 * and use it for other purposes.
 */
function onRowClick(data) {
  console.log("Row data below!");
  console.log(data);
}

/**
 * The data array is all the data we want going into our table.
 * Make sure every object in the array has an attribute covering a field
 * that was defined in the columns array below.
 */

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
      "name" /*, render: row => <div onClick={() => console.log(row.id)}>{row.name}</div> */,
    headerStyle: {
      color: 700,
    },
  },
  { title: "Description", field: "description" },
  { title: "Number of Open Tickets", field: "tickets" },
];

export const TeamsPageProjectsTable = ({ projects }) => {
  return (
    <MaterialTable
      title="Projects assigned to the team" // REQUIRED: The title of your table
      columns={columns} // REQUIRED: The columns of your table
      data={projects}
    />
  );
};
