import { useContext } from "react"
import AppContext from "../context/AppContext"
import CricketerCard from "../components/cards/CricketerCard";
import { TPlayer } from "../types";

/**
 * TODO:
 * - Filter
 * - Sorting
 * - Pagination
 * @returns 
 */
const Cricketers = () => {
  const context = useContext(AppContext);

  return <>
    <div className="flex items-start gap-4 flex-col p-2">
      {context?.app.players.map(({ description, ...rest }: TPlayer) => <CricketerCard {...rest} />)}
    </div>
  </>;
}

export default Cricketers