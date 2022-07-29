/**
 * USE THIS AS A TEMPLATE FOR CREATING NEW TABLES
 *
 *
 */

import MaterialTable from "material-table";

/**
 * Gets called when a row is clicked.
 * Takes the data of the row and console logs it.
 * You can use this data to pull id or anything else you want,
 * and use it for other purposes.
 */
function onRowClick(data) {}

/**
 * The data array is all the data we want going into our table.
 * Make sure every object in the array has an attribute covering a field
 * that was defined in the columns array below.
 */

const data = [
  { id: 1, name: "Mohammad", surname: "Faisal", birthYear: 1995 },
  { id: 2, name: "Nayeem Raihan ", surname: "Shuvo", birthYear: 1994 },
];

/**
 * The columns array defines everything going into columns.
 * The title is what will be shown on the page, and the field is what is being pulled from the data array above.
 *
 * For example: if the field in a column is name, it will take the "name" attribute from an object in data above and
 * place it into that column
 */
const columns = [
  { title: "Id", field: "id", hidden: true }, // Set the id field to hidden. This will hide that column from the user. We want to use the ID of row items for other purposes but don't want to show it to the user as they have no need for it
  {
    title: "Name",
    field: "name",
  },
  { title: "Surname", field: "surname" },
  { title: "Birth Year", field: "birthYear", type: "numeric" },
];

export const BasicTable = () => {
  return (
    <MaterialTable
      title="Basic Table" // REQUIRED: The title of your table
      columns={columns} // REQUIRED: The columns of your table
      data={data} // REQUIRED: The data of your table
      onRowClick={(handleOnRowClick, rowData) => onRowClick(rowData)}
    />
  ); // OPTIONAL: Takes the data of the row that is being clicked (rowData is built-in with the library) and console.logs it. Use this data to pull id of the row for various purposes
};
