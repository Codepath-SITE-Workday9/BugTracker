import { useProjectContext } from "../../../contexts/project";
import "./SortByDropdown.css";

export default function SortByDrowpdown({
  categories,
  // handleOnFilterChange
}) {
  const { setSortValue } = useProjectContext();
  return (
    <div className="sort-by-dropdown">
      <select
        name="selectList"
        id="selectList"
        onChange={(evt) => setSortValue(evt.target.value)}
      >
        {categories?.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
