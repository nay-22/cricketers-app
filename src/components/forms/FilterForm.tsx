import { ChangeEvent, MouseEvent } from "react";
import { SortBy, SortOrder, TMayBe, TPlayerType } from "../../types";
import SortUpIcon from "../../assets/icons/SortUpIcon";
import FilterIcon from "../../assets/icons/FilterIcon";
import SortIcon from "../../assets/icons/SortIcon";
import useTheme from "../../hooks/useTheme";
import useApp from "../../hooks/useApp";

const FilterForm = () => {
  const { preferences, setPreferences } = useApp();
  const theme = useTheme();

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPreferences((prev) => ({
      ...prev,
      filterType: e.target.value as TMayBe<TPlayerType>,
    }));
  };

  const clearFilterType = () =>
    setPreferences((prev) => ({ ...prev, filterType: undefined }));

  const handleSortChange = (e: MouseEvent) => {
    const [by, type] = e.currentTarget.id.split("-") as [SortBy, SortOrder];
    const { sort } = preferences;
    if (sort.by === by && sort.type === type) {
      setPreferences((prev) => ({
        ...prev,
        sort: {
          by: "none",
          type: "asc",
        },
      }));
    } else {
      setPreferences((prev) => ({
        ...prev,
        sort: {
          by,
          type,
        },
      }));
    }
  };

  return (
    <div
      className={`flex items-start justify-center flex-col gap-1 ${theme.background?.primary} ${theme.text?.primary} p-4 rounded-lg w-62`}
    >
      <div className="w-full flex items-start justify-center gap-1 flex-col">
        <div className="w-full flex items-center justify-between">
          <label htmlFor="type">Type</label>
          <FilterIcon className="stroke-amber-500" width={20} height={20} />
        </div>
        <div className="flex items-center justify-between gap-2 w-full">
          <select
            onChange={handleFilterChange}
            value={preferences.filterType ?? "Select Type"}
            name="type"
            id="type"
            className={`${theme.background?.accent} border-1 border-gray-400 p-2 rounded-md w-full`}
          >
            <option disabled value={undefined}>
              Select Type
            </option>
            <option value={"allRounder"}>All Rounder</option>
            <option value={"bowler"}>Bowler</option>
            <option value={"wicketKeeper"}>Wicket Keeper</option>
            <option value={"batsman"}>Batsman</option>
          </select>
          <button
            onClick={clearFilterType}
            className="hover:cursor-pointer text-center w-7 h-full rounded-full bg-red-300"
            data-testid="clear-filter"
          >
            x
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <h3>Sort By</h3>
        <SortIcon width={20} height={20} className={theme.background?.accent} />
      </div>
      <div className="flex items-start justify-between gap-3 flex-col w-full">
        <div
          className={`${theme.background?.tertiary} rounded-md px-2 py-1 gap-2 flex items-center justify-between w-full`}
        >
          <h6>Name</h6>
          <div className="flex items-center justify-center gap-2">
            <button
              id="name-asc"
              onClick={handleSortChange}
              className={`${
                preferences.sort.by === "name" &&
                preferences.sort.type === "asc"
                  ? `${theme.background?.accent}`
                  : ""
              } p-1 hover:cursor-pointer rounded-md`}
              data-testid="name-asc"
            >
              <SortUpIcon />
            </button>
            <button
              id="name-dsc"
              onClick={handleSortChange}
              className={`${
                preferences.sort.by === "name" &&
                preferences.sort.type === "dsc"
                  ? `${theme.background?.accent}`
                  : ""
              } p-1 hover:cursor-pointer rounded-md`}
              data-testid="name-dsc"
            >
              <SortUpIcon className="rotate-180" />
            </button>
          </div>
        </div>
        <div
          className={`${theme.background?.tertiary} rounded-md px-2 py-1 gap-2 flex items-center justify-between w-full`}
        >
          <h6>Rank</h6>
          <div className="flex items-center justify-center gap-2">
            <button
              id="rank-asc"
              onClick={handleSortChange}
              className={`${
                preferences.sort.by === "rank" &&
                preferences.sort.type === "asc"
                  ? `${theme.background?.accent}`
                  : ""
              } p-1 hover:cursor-pointer rounded-md`}
            >
              <SortUpIcon />
            </button>
            <button
              id="rank-dsc"
              onClick={handleSortChange}
              className={`${
                preferences.sort.by === "rank" &&
                preferences.sort.type === "dsc"
                  ? `${theme.background?.accent}`
                  : ""
              } p-1 hover:cursor-pointer rounded-md`}
            >
              <SortUpIcon className="rotate-180" />
            </button>
          </div>
        </div>
        <div
          className={`${theme.background?.tertiary} rounded-md px-2 py-1 gap-2 flex items-center justify-between w-full`}
        >
          <h6>Age</h6>
          <div className="flex items-center justify-center gap-2">
            <button
              id="age-asc"
              onClick={handleSortChange}
              className={`${
                preferences.sort.by === "age" && preferences.sort.type === "asc"
                  ? `${theme.background?.accent}`
                  : ""
              } p-1 hover:cursor-pointer rounded-md`}
            >
              <SortUpIcon />
            </button>
            <button
              id="age-dsc"
              onClick={handleSortChange}
              className={`${
                preferences.sort.by === "age" && preferences.sort.type === "dsc"
                  ? `${theme.background?.accent}`
                  : ""
              } p-1 hover:cursor-pointer rounded-md`}
            >
              <SortUpIcon className="rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
