import { React, useState, useEffect } from "react";
import "./TicketsPage.css";
import TicketModal from "../Modals/TicketModal/TicketModal";
import { useTicketContext } from "../../contexts/ticket";
import TicketsOverview from "./TicketsOverview/TicketsOverview";
import TicketView from "./TicketView/TicketView";

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
  } = useTicketContext();

  // useEffect(() => {
  //   fetchAllTickets();
  // }, [ticketModal]);

  const handleOnTicketClick = (ticket) => {
    setCurrentTicket(ticket);
  };

  return (
    <div className="tickets-page">
      {/* conditionally render the Modal to create a new ticket  */}
      {ticketModal && <TicketModal />}
      {/* conditionally blur background depending on if modal is open */}
      <div className={ticketModal ? "background-blur" : "background"}>
        <TicketsOverview
          tickets={tickets}
          handleOnTicketClick={handleOnTicketClick}
          isLoading={isLoading}
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
