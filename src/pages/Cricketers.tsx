import { FC, useContext, useEffect, useState } from "react"
import AppContext from "../context/AppContext"
import CricketerCard from "../components/cards/CricketerCard";
import { TPlayer } from "../types";
import Paginator from "../components/Paginator";
import { Link } from "react-router-dom";

export type CricketersProps = {
  itemsPerPage?: number;
}

/**
 * TODO:
 * - Filter
 * - Sorting
 * - Pagination
 * @returns 
 */
const Cricketers: FC<CricketersProps> = ({ itemsPerPage = 10 }) => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Context undefined");
  }

  const [paginatedData, setPaginatedData] = useState<TPlayer[]>(context.app.players.slice(0, itemsPerPage))

  const handlePageChange = (page: number, limit: number) => {
    const start = page * limit;
    const end = start + limit;
    setPaginatedData(context.app.players.slice(start, end));
  }

  useEffect(() => {
    setPaginatedData(context.app.players.slice(0, itemsPerPage));
  }, [context.app.players, itemsPerPage])

  return <>
    <header>
      <Paginator showControls showJumpControls limit={itemsPerPage} items={context.app.players.length} onClick={handlePageChange} />
    </header>
    <div className="flex items-start gap-4 flex-col p-2">
      {paginatedData.map(({ description, ...rest }: TPlayer, i) => <Link
        className="w-full"
        to={`/cricketer/${rest.id}`}
      >
        <CricketerCard key={`${i}-${rest.id}`} {...rest} />
      </Link>
      )}
    </div>
  </>;
}

export default Cricketers