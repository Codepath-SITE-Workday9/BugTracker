import "./AddDevelopersDropdown.css";

export default function AddDevelopersDropdown({ developers, onClick, close}) {
  
  return (
    <div className="dropdown-container">
      {developers?.map((d) => (
        <div className="option-row" onClick={(evt) => onClick(d)}>
          <p>{d}</p>
        </div>
      ))}
      <div className="option-row" id="dropdown-close-button" onClick={close}>
        <p id="close-text">CLOSE</p>
      </div>
    </div>
  );
}
