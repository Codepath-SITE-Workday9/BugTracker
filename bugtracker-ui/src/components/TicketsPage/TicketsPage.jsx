import React from "react";
import "./TicketsPage.css"

export default function TicketsPage() {
  return (
    <div className="tickets-page">
      <div className="row">

        <div className="projects-box">
          <div className="project-box-header">
            <h1>Selected Project: Project 1</h1>
            <button>Select Project</button>
          </div>
          <div className="project-box-content">
            
          </div>
        </div>

        <div className="tickets-box">Tickets Box</div>
      </div>
      <div className="row">
        <div className="ticket-info-box">Ticket Info Box</div>
      </div>
    </div>
  )
}
