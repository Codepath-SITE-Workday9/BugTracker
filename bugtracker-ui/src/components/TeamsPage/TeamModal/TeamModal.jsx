import "./TeamModal.css";

export default function TeamModal({ setModal }) {
  return (
    <div className="team-modal-background">
      <div className="team-modal-container">
        <div className="header">
          <p>CREATE A NEW TEAM</p>
          <button className="close-modal-btn" onClick={() => setModal(false)}>
            X
          </button>
        </div>
        <TeamModalForm setModal={setModal} />
      </div>
    </div>
  );
}

export function TeamModalForm({ setModal }) {
  return (
    <div className="form">
      <div className="input-field-name">
        <label htmlFor="name">Enter team name</label>
        <input
          className="form-input"
          name="name"
          type="text"
          //   value={form.name}
          //   onChange={handleOnInputChange}
          placeholder="team name"
        />
      </div>

      <div className="teams-search">
        <label htmlFor="search">Search for developers by email </label>
        <input
          className="search-input"
          type="text"
          name="search"
          placeholder="search for developers"
          //   onChange={handleOnChange}
        />
        <i className="material-icons">search</i>
      </div>
      <div className="modal=buttons">
        <button className="cancel" onClick={() => setModal(false)}>
          Cancel
        </button>
        <button className="submit"> Submit </button>
      </div>
    </div>
  );
}
