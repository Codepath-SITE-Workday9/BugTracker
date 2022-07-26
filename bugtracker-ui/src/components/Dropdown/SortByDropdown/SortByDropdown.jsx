import "./SortByDropdown.css";

export default function SortByDrowpdown({ categories }) {
  var category = ["Highest open tickets", "Least open tickets"];
  return (
    <div className="sort-by-dropdown">
      <select name="selectList" id="selectList">
        {category.map((c) => (
          <option value="option 1" key={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
