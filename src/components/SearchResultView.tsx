import { Link } from "react-router-dom";

const SearchResultView = ({ name, id }: { name: string; id: string }) => {
  return (
    <Link data-testid="result-view" to={`/cricketer/${id}`}>
      <div className="p-2">{name}</div>
    </Link>
  );
};

export default SearchResultView;
