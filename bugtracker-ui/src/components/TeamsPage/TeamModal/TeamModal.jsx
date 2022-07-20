import "./TeamModal.css";

export default function TeamModal({ setModal }) {
  return (
    <div className="team-modal-background">
      <div className="team-modal-container">
        <div className="header">
          <p>CREATE A NEW PROJECT</p>
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
      <div className="input-field">
        <label htmlFor="name">Enter Team Name</label>
        <input
          className="form-input"
          name="name"
          type="text"
          //   value={form.email}
          //   onChange={handleOnInputChange}
          placeholder="team name"
        />
        {/* {errors.email && <p className="error">{errors.email}</p>} */}
      </div>
      <div className="input-field">
        <label htmlFor="describe">Describe your team</label>
        <input
          className="form-input"
          name="describe"
          type="text"
          //   value={form.password}
          //   onChange={handleOnInputChange}
          placeholder="describe your team "
        />
        {/* {errors.password && <p className="error">{errors.password}</p>} */}
      </div>
      <div className="teams-search">
        <input
          className="search-input"
          type="text"
          name="search"
          placeholder="search for teams"
          //   onChange={handleOnChange}
        />
        <i className="material-icons">search</i>
      </div>
      <button className="cancel" onClick={() => setModal(false)}>
        {" "}
        Cancel{" "}
      </button>
      <button className="submit"> Submit </button>
    </div>
  );
}
