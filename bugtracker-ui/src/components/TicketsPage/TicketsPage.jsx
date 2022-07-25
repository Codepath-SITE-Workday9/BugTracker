import { React , useState } from "react";
import "./TicketsPage.css"
import { TicketsPageCollaboratorsTable } from "../Tables/TicketsPageCollaboratorsTable";
import { TicketsPageTicketsTable } from "../Tables/TicketsPageTicketsTable";
import TicketInfoBox from "./TicketInfoBox/TicketInfoBox";

export default function TicketsPage() {


  const handleNewProjectClick = () => {
    
  };

  return (
    <div className="tickets-page">

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
  )
}
