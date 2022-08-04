import "./SortByDropdown.css";

export default function SortByDrowpdown({ categories, handleOnFilterChange }) {

  return (
    <div className="sort-by-dropdown">
      <select name="selectList" id="selectList" onChange={(evt) => handleOnFilterChange(evt.target.value)}>
        {categories?.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
