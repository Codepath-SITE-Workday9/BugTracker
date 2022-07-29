import MaterialTable from "material-table";

/**
 * The data array is all the data we want going into our table.
 * Make sure every object in the array has an attribute covering a field
 * that was defined in the columns array below.
 */

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
  { title: "Number of Open Tickets", field: "tickets" },
];

export const TeamsPageProjectsTable = ({ projects }) => {
  return (
    <MaterialTable
      title="Projects assigned to the team"
      columns={columns}
      data={projects}
    />
  );
};
