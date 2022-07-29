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
  { id: 1, name: "John Doe", role: "Developer", numtickets: 4 },
  { id: 2, name: "Jane Doe", role: "Developer", numtickets: 1 },
  { id: 3, name: "David Smith", role: "Developer", numtickets: 6 },
  { id: 4, name: "Emma Rodriguez", role: "Developer", numtickets: 3 },
];

/**
 * The columns array defines everything going into columns.
 * The title is what will be shown on the page, and the field is what is being pulled from the data array above.
 *
 * For example: if the field in a column is name, it will take the "name" attribute from an object in data above and
 * place it into that column
 */
const columns = [
  { title: "Id", field: "id", hidden: "true" },
  { title: "Name", field: "name" },
  { title: "Role", field: "role" },
  { title: "Number of open tickets", field: "numtickets" },
];

export const TeamsPageDevelopersTable = () => {
  return (
    <MaterialTable
      title="Developers on the team"
      columns={columns}
      data={data}
    />
  );
};
