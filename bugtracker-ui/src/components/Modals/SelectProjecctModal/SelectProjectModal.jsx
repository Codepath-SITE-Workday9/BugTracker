import "./SelectProjectModal.css";

export default function SelectProjectModal() {
  return (
    <div className="select-project-modal-background">
      <div className="select-project-modal-container">
        {/* modal header: header text & a close button */}
        <div className="header">
          <p>SELECT A PROJECT</p>
          <button
            className="close-modal-btn"
            onClick={() => setTicketModal(false)}
          >
            X
          </button>
        </div>

        {/* form area to create new ticket */}
        <div className="form">
          <div className="form-area">
            <p className="errors"> {errors} </p>
          </div>
          {/* cancel and submit buttons */}
          <div className="modal-buttons">
            <button className="cancel" onClick={() => setTicketModal(false)}>
              Cancel
            </button>
            <button className="submit" onClick={handleOnCreateNewTicketSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
