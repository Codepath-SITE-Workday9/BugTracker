import "./SortByDropdown.css";

export default function SortByDrowpdown({ categories, handleOnFilterChange }) {

  return (
    <div className="sort-by-dropdown">
      <select name="selectList" id="selectList" onChange={handleOnFilterChange}>
        {categories?.map((category) => (
          <option value="option 1" key={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
