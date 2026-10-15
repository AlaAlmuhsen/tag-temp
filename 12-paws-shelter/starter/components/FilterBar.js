import { PET_TYPES } from "../data/pets";

function FilterBar() {
  // TODO: the selected type should live in the URL: /pets?type=cat
  //       → const [searchParams, setSearchParams] = useSearchParams()
  //       → read:  searchParams.get("type") || "all"
  //       → write: setSearchParams({ type }) (or {} for "all")
  //       Why the URL and not useState? Refresh the page or share the link 😉
  const currentType = "all";

  return (
    <div className="filter-bar">
      {Object.entries(PET_TYPES).map(([type, label]) => (
        <button
          key={type}
          className={type === currentType ? "selected" : ""}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
