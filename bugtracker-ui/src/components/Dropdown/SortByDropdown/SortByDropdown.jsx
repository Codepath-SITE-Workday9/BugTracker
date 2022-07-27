import "./SortByDropdown.css";

export default function SortByDrowpdown({ categories }) {
  return (
    <div className="sort-by-dropdown">
      <select name="selectList" id="selectList">
        {categories?.map((c) => (
          <option value="option 1" key={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
