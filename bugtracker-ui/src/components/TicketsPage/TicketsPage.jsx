import { React, useState } from "react";
import "./TicketsPage.css";
import { TicketsPageCollaboratorsTable } from "../Tables/TicketsPageCollaboratorsTable";
import { TicketsPageTicketsTable } from "../Tables/TicketsPageTicketsTable";
import TicketInfoBox from "./TicketInfoBox/TicketInfoBox";
import TicketModal from "../Modals/TicketModal/TicketModal";

export default function TicketsPage() {
  const { ticketModal } = useTicketContext();

  const handleNewProjectClick = () => {};

  return (
    <div className="tickets-page">
      {/* conditionally render the Modal to create a new ticket  */}
      {ticketModal && <TicketModal />}
      {/* conditionally blur background depending on if modal is open */}
      <div className={ticket ? "background-blur" : "background"}>
        <div className="row">
          <div className="projects-box">
            <div className="project-box-header">
              <h1>Selected Project: Project 1</h1>
              <button onClick={handleNewProjectClick}>Select Project</button>
            </div>
            <div className="project-box-content">
              <TicketsPageCollaboratorsTable />
            </div>
          </div>
          <div className="tickets-box">
            <TicketsPageTicketsTable />
          </div>
        </div>

        <div className="row">
          <TicketInfoBox />
        </div>
      </div>
    </div>
  );
}
