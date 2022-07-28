import "./DashboardProjectsModal.css";

export default function DashboardProjectsModal({ setDashboardProjectsModal }) {
  return (
    <div className="project-modal-background">
      <div className="project-modal-container">
        <div className="header">
          <p>CREATE A NEW PROJECT</p>
          <button className="close-modal-btn" onClick={() => setDashboardProjectsModal(false)}>
            X
          </button>
        </div>
        <div className="content">
          <div className="form-container">
            <ProjectModalForm setDashboardProjectsModal={setDashboardProjectsModal} />
          </div>
          <div className="modal-buttons">
            <button className="cancel" onClick={() => setDashboardProjectsModal(false)}>
              {" "}
              Cancel{" "}
            </button>
            <button className="submit"> Submit </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectModalForm({ setDashboardProjectsModal }) {
  return (
    <div className="form">
      <div className="input-field">
        <div className="modal-input">
          <label htmlFor="name">Enter project name</label>
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
      </div>

      <div className="split-input-fields">
        <div className="input-field">
          <div className="modal-input">
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
        </div>
        <div className="teams-search">
          <div className="modal-input">
            <label htmlFor="search">Assign teams to your project</label>
            <div className="searhc-box">
              <input
                className="search-input"
                type="text"
                name="search"
                placeholder="search for teams"
                //   onChange={handleOnChange}
              />
              <button className="search-btn">
                <i className="material-icons">search</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
