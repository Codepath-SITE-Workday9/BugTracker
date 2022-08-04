import "./SortByDropdown.css";

export default function SortByDrowpdown({ categories }) {
  const handleOnClick = () => {
    console.log("entered")
  }

  return (
    <div className="sort-by-dropdown">
      <select name="selectList" id="selectList" handleOnClick={handleOnClick}>
        {categories?.map((category) => (
          <option value="option 1" key={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
