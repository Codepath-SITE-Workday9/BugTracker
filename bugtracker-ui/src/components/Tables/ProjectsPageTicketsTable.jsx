import MaterialTable from "material-table";
import { useTicketContext } from "../../contexts/ticket";
import { useProjectContext } from "../../contexts/project";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";

const columns = [
  { title: "Id", field: "id", hidden: true },
  { title: "Ticket name", field: "title" },
  { title: "Description", field: "description" },
  { title: "Priority", field: "priority" },
  { title: "Complexity", field: "complexity", type: "numeric" },
];

export const ProjectsPageTicketsTable = ({ currentProject }) => {
  const [tickets, setTickets] = useState([]);
  const { setCurrentTicket } = useTicketContext();

  const navigate = useNavigate();

  const fetchTickets = async () => {
    if (currentProject) {
      const { data, error } = await apiClient.listAllProjectTickets(
        currentProject.id
      );
      if (data) {
        setTickets(data.ticketList);
      }
    }
  };

  const onRowClick = (rowData) => {
    setCurrentTicket(rowData);
    navigate("/tickets");
  };

  useEffect(() => {
    fetchTickets();
  }, [currentProject]);

  return (
    tickets && (
      <MaterialTable
        title="Tickets"
        columns={columns}
        data={tickets}
        actions={[
          {
            icon: () => (
              <button className="tableCreateButton">Create New Ticket</button>
            ),
            tooltip: "Create a new ticket",
            isFreeAction: true,
            position: "toolbar",
          },
        ]}
        onRowClick={(handleOnRowClick, rowData) => onRowClick(rowData)}
      />
    )
  );
};
