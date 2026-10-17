import { useSearchParams } from "react-router-dom";
import { PET_TYPES } from "../utils";

function FilterBar() {
  // State that lives in the URL: /pets?type=cat
  const [searchParams, setSearchParams] = useSearchParams();
  const currentType = searchParams.get("type") || "all";

  function handleClick(type) {
    if (type === "all") setSearchParams({});
    else setSearchParams({ type });
  }

  return (
    <div className="filter-bar">
      {Object.entries(PET_TYPES).map(([type, label]) => (
        <button
          key={type}
          className={type === currentType ? "selected" : ""}
          onClick={() => handleClick(type)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
