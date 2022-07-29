import MaterialTable from "material-table";

const data = [
  {
    id: 1,
    ticket_name: "Fix margins",
    description: "Make everything more spaced out",
    priority: "low",
    complexity: 2,
  },
  {
    id: 2,
    ticket_name: "Fix connection error",
    description: "The server isn't loading properly, please fix",
    priority: "high",
    complexity: 6,
  },
  {
    id: 3,
    ticket_name: "Finish landing page",
    description:
      "Make the styling nice and add some cool gifs sayudhuiwahdh  asidhwiuhadhui",
    priority: "low",
    complexity: 3,
  },
];

const columns = [
  { title: "Id", field: "id", hidden: true },
  {
    title: "Ticket name",
    field: "ticket_name",
  },
  { title: "Description", field: "description" },
  { title: "Priority", field: "priority" },
  { title: "Complexity", field: "complexity", type: "numeric" },
];

export const ProjectsPageTicketsTable = () => {
  return (
    <MaterialTable
      title="Tickets"
      columns={columns}
      data={data}
      actions={[
        {
          icon: () => (
            <button className="tableCreateButton">Open A New Ticket</button>
          ),
          tooltip: "Create a new ticket",
          isFreeAction: true,
          position: "toolbar",
        },
      ]}
      onRowClick={(handleOnRowClick, rowData) => onRowClick(rowData)}
    />
  );
};
