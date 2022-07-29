import MaterialTable from "material-table";

const data = [
  { id: 1, name: "John Doe", role: "Developer", numtickets: 4 },
  { id: 2, name: "Jane Doe", role: "Developer", numtickets: 1 },
  { id: 3, name: "David Smith", role: "Developer", numtickets: 6 },
  { id: 4, name: "Emma Rodriguez", role: "Developer", numtickets: 3 },
];

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
