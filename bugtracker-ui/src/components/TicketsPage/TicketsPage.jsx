import "./TicketsPage.css";
import { React, useState, useEffect } from "react";
import { useTicketContext } from "../../contexts/ticket";
import TicketModal from "../Modals/TicketModal/TicketModal";
import TicketsOverview from "./TicketsOverview/TicketsOverview";
import TicketView from "./TicketView/TicketView";
import apiClient from "../../services/apiClient";

// page where a user can see all tickets they belong to and where  user can create a new Ticket
export default function TicketsPage() {
  // variables from useTeamContext() to keep track of what tickets a user belongs to, and which ticket should be displayed in detail, and a function to fetch all tickets.
  const {
    tickets,
    currentTicket,
    setCurrentTicket,
    fetchAllTickets,
    ticketModal,
    isLoading,
    selectedProject,
    setSelectedProject,
    selectedProjectTickets,
    setSelectedProjectTickets,
    fetchProjectTickets,
  } = useTicketContext();

  const [availableMembers, setAvailableMembers] = useState([]);

  useEffect(() => {
    fetchAllTickets();
  }, [ticketModal]);

  useEffect(() => {
    fetchMemsForTicket();
  }, [selectedProject]);

  const handleOnTicketClick = (ticket) => {
    setCurrentTicket(ticket);
    fetchMemsForTicket(ticket.id);
  };

  // function to get all available members for a ticket
  // * available members are any users who are apart of a team on the project that the ticket is being opened for
  // First, send a request to get the teams list for the selected project,
  // Then, call fetchTeamMembers and pass in the teams array to get the array of member names
  const fetchMemsForTicket = async () => {
    if (selectedProject > -1) {
      setAvailableMembers([]);
      let teams = await getTeamsList();
      teams.map((t) => {
        appendToEmailArray(t);
      });
    }
  };
  const appendToEmailArray = async (teamId) => {
    const { data, error } = await apiClient.fetchMemberList(teamId);
    data.teamsData.map((member) =>
      setAvailableMembers((prev) => [...prev, member.email])
    );
  };
  const getTeamsList = async () => {
    if (selectedProject > 0) {
      const { data, error } = await apiClient.fetchProjectById(selectedProject);
      if (data) {
        return data.project.teams;
      }
    }
  };

  // handler function to set the selected project when a user selects a project from the dropdown
  const handleOnProjectChange = (event) => {
    setSelectedProject(event.target.value);
    if (event.target.value < 0) {
      setSelectedProjectTickets(tickets);
    } else {
      setSelectedProjectTickets(
        tickets.filter((t) => t.project_id == event.target.value)
      );
    }
  };

  return (
    <div className="tickets-page">
      {/* conditionally render the Modal to create a new ticket  */}
      {ticketModal && (
        <TicketModal
          availableMembers={availableMembers}
          setCurrentProject={setSelectedProject}
          currentProject={selectedProject}
          handleOnProjectChange={handleOnProjectChange}
        />
      )}
      {/* conditionally blur background depending on if modal is open */}
      <div className={ticketModal ? "background-blur" : "background"}>
        <TicketsOverview
          tickets={tickets}
          handleOnTicketClick={handleOnTicketClick}
          isLoading={isLoading}
          setCurrentProject={setSelectedProject}
          currentProject={selectedProject}
          handleOnProjectChange={handleOnProjectChange}
          selectedProjectTickets={selectedProjectTickets}
        />
        <TicketView
          currentTicket={currentTicket}
          ticketsAvailable={tickets.length > 0}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
