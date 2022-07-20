import "./ProjectModal.css";

export default function ProjectModal({ setModal }) {
  return (
    <div className="project-modal-background">
      <div className="project-modal-container">
        <div className="header">
          <p>CREATE A NEW PROJECT</p>
          <button className="close-modal-btn" onClick={() => setModal(false)}>
            X
          </button>
        </div>
        <ProjectModalForm setModal={setModal} />
      </div>
    </div>
  );
}

export function ProjectModalForm({ setModal }) {
  return (
    <div className="form">
      <div className="input-field">
        <label htmlFor="name">Enter Project Name</label>
        <input
          className="form-input"
          name="name"
          type="text"
          //   value={form.email}
          //   onChange={handleOnInputChange}
          placeholder="project name"
        />
        {/* {errors.email && <p className="error">{errors.email}</p>} */}
      </div>
      <div className="input-field">
        <label htmlFor="describe">Describe your project</label>
        <input
          className="form-input"
          name="describe"
          type="text"
          //   value={form.password}
          //   onChange={handleOnInputChange}
          placeholder="describe your project "
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
