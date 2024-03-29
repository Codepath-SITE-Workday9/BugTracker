import MaterialTable from "material-table";
import { useTicketContext } from "../../contexts/ticket";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";

const columns = [
  { title: "Id", field: "id", hidden: true },
  {
    title: "Ticket name",
    field: "title",
    cellStyle: {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      maxWidth: 400,
    },
  },
  {
    title: "Description",
    field: "description",
    cellStyle: {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      maxWidth: 400,
    },
  },
  { title: "Priority", field: "priority" },
  { title: "Status", field: "status" },
  { title: "Complexity", field: "complexity", type: "numeric" },
];

export const ProjectsPageTicketsTable = ({ currentProject }) => {
  const [tickets, setTickets] = useState([]);
  const { setCurrentTicket, currentTicket } = useTicketContext();
  const { ticketModal, setTicketModal } = useTicketContext();

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

  const handleClickCreateTicket = () => {
    setTicketModal(true);
  };

  useEffect(() => {
    fetchTickets();
  }, [currentProject, currentTicket]);

  return (
    tickets && (
      <MaterialTable
        title="Tickets"
        columns={columns}
        data={tickets}
        actions={[
          {
            icon: () => (
              <button
                className="tableCreateButton"
                onClick={handleClickCreateTicket}
              >
                Create New Ticket
              </button>
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
