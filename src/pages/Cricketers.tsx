import { FC, lazy, Suspense, useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import CricketerCard from "../components/cards/CricketerCard";
import { TPlayer } from "../types";
import Paginator from "../components/Paginator";
import { Link } from "react-router-dom";
import FilterIcon from "../assets/icons/FilterIcon";
import Modal from "../components/Modal";

const FilterForm = lazy(() => import("../forms/FilterForm"));

export type CricketersProps = {
  itemsPerPage?: number;
};

/**
 * TODO:
 * - Search(TypeAhead)
 * @returns
 */
const Cricketers: FC<CricketersProps> = ({ itemsPerPage = 10 }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Context undefined");
  }

  const { app } = context;

  const [paginatedData, setPaginatedData] = useState<TPlayer[]>(
    app.players.slice(0, itemsPerPage)
  );

  useEffect(() => {
    setPaginatedData(app.players.slice(0, itemsPerPage));
  }, [app.players, itemsPerPage]);

  const handlePageChange = (page: number, limit: number) => {
    const start = page * limit;
    const end = start + limit;
    setPaginatedData(app.players.slice(start, end));
  };

  return (
    <>
      <header className="p-2 sticky top-0 bg-white/60 backdrop-blur-[5px] flex items-center justify-between">
        <div></div>
        <Paginator
          className="grow"
          showControls
          showJumpControls
          limit={itemsPerPage}
          items={app.players.length}
          onClick={handlePageChange}
        />
        <button
          className="hover:cursor-pointer hover:bg-gray-100 rounded-lg p-1"
          onClick={() => setShowModal(true)}
        >
          <FilterIcon className="stroke-amber-600" />
        </button>
      </header>
      <div className="flex items-start gap-4 flex-col p-2">
        {paginatedData.map(({ description, ...rest }: TPlayer, i) => (
          <Link
            key={`${i}-${rest.id}`}
            className="w-full"
            to={`/cricketer/${rest.id}`}
          >
            <CricketerCard {...rest} />
          </Link>
        ))}
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Suspense fallback={<p>Loading...</p>}>
          <FilterForm />
        </Suspense>
      </Modal>
    </>
  );
};

export default Cricketers;
