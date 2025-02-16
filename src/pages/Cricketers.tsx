import { FC, lazy, Suspense, useEffect, useState } from "react";
import CricketerCard from "../components/cards/CricketerCard";
import { TPlayer } from "../types";
import Paginator from "../components/Paginator";
import { Link } from "react-router-dom";
import FilterIcon from "../assets/icons/FilterIcon";
import Modal from "../components/Modal";
import useTheme from "../hooks/useTheme";
import useApp from "../hooks/useApp";
import Loader from "../components/Loader";

const FilterForm = lazy(() => import("../components/forms/FilterForm"));

export type CricketersProps = {
  itemsPerPage?: number;
};

/**
 *
 * @returns
 */
const Cricketers: FC<CricketersProps> = ({ itemsPerPage = 10 }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { app } = useApp();
  const theme = useTheme();

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
    <div
      className={`${theme.background?.primary} ${theme.text?.primary} md:px-6 lg:px-10 max-md:pb-12`}
    >
      <header
        className={`hidden p-2 sticky top-0 backdrop-blur-[5px] md:flex items-center justify-between`}
      >
        <div></div>
        <Paginator
          styleOptions={{
            wrapper: {
              className: `grow`,
            },
            icons: {
              className: theme.border?.primary,
            },
          }}
          showControls
          showJumpControls
          limit={itemsPerPage}
          items={app.players.length}
          onClick={handlePageChange}
        />
        <button
          className="hover:cursor-pointer hover:bg-gray-100 rounded-lg p-1"
          onClick={() => setShowModal(true)}
          aria-label="Filter"
        >
          <FilterIcon className="stroke-amber-600" />
        </button>
      </header>
      <div
        className={`flex items-start gap-4 flex-col p-2 ${theme.background?.primary}`}
      >
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
      <footer className="flex p-2 fixed bottom-0 w-full backdrop-blur-[5px] md:hidden items-center justify-between">
        <div></div>
        <Paginator
          styleOptions={{
            wrapper: {
              className: "grow",
            },
            icons: {
              className: theme.border?.primary,
            },
          }}
          showControls
          showJumpControls
          limit={itemsPerPage}
          items={app.players.length}
          onClick={handlePageChange}
        />
        <button
          className="hover:cursor-pointer hover:bg-gray-100 rounded-lg p-1"
          onClick={() => setShowModal(true)}
          aria-label="Filter"
        >
          <FilterIcon className="stroke-amber-600" />
        </button>
      </footer>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Suspense fallback={<Loader />}>
          <FilterForm />
        </Suspense>
      </Modal>
    </div>
  );
};

export default Cricketers;
