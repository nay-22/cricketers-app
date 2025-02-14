import { Link, useParams } from "react-router-dom";
import CricketerCard from "../components/cards/CricketerCard";
import useTheme from "../hooks/useTheme";
import useApp from "../hooks/useApp";

const CricketerDetails = () => {
  const { id } = useParams();
  const { app } = useApp();
  const theme = useTheme();

  const player = app.players.find((pl) => pl.id === id);
  const similarPlayers =
    app.players
      .filter((pl1) => pl1.type === player?.type && pl1.id !== player?.id)
      .slice(0, 5) || [];

  return (
    <div
      className={`${theme.background?.primary} ${theme.text?.primary} h-screen md:px-10`}
    >
      <div className="p-4">
        <CricketerCard {...player} />
      </div>
      {similarPlayers.length > 0 && (
        <div className="shadow-2xl py-4 mx-4 rounded-xl">
          <h4 className="px-4 pb-4 text-2xl font-bold">Similar Cricketers</h4>
          <div className="flex items-center justify-start gap-4 overflow-x-auto max-w-full mx-4">
            {similarPlayers.map((pl2, i) => (
              <Link to={`/cricketer/${pl2.id}`} key={`${i}-${pl2.id}`}>
                <CricketerCard
                  name={pl2.name}
                  points={pl2.points}
                  rank={pl2.rank}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CricketerDetails;
