import { Link } from "react-router-dom";
import useApp from "../hooks/useApp";

const SearchResultView = ({ name, id }: { name: string; id: string }) => {
  const app = useApp();

  return (
    <Link data-testid="result-view" to={`/cricketer/${id}`}>
      <div
        className={`p-2 ${
          app.preferences.theme === "dark"
            ? "hover:bg-slate-700"
            : "hover:bg-slate-300"
        }`}
      >
        {name}
      </div>
    </Link>
  );
};

export default SearchResultView;
