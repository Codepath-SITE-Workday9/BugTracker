import "./AddDevelopersDropdown.css";

export default function AddDevelopersDropdown({ developers, onClick }) {
  
  return (
    <div className="dropdown-container">
      {developers?.map((d) => (
        <div className="option-row" onClick={() => onClick(d)}>
          <p>{d}</p>
        </div>
      ))}
    </div>
  );
}
