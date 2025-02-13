// name, description, type, points, rank(derived), dob, age(derived)

import { FC } from "react";
import { TPlayer } from "../../types";
import Chip from "../Chip";

const CricketerCard: FC<TPlayer> = ({
  id,
  name,
  description,
  type,
  points,
  rank,
  dob,
}) => {
  return (
    <div className="rounded-xl w-full">
      <div className="bg-gray-300 rounded-t-xl p-2 flex items-center justify-between">
        {name && <div className="text-xl font-semibold">{name}</div>}
        {dob && (
          <div className="font-semibold text-gray-600">
            {new Date(dob).toLocaleDateString()}
          </div>
        )}
      </div>
      {description && <div className="p-2">{description}</div>}
      <div className="p-2 bg-gray-300 rounded-b-2xl flex items-center justify-start gap-2">
        {type && <Chip className="bg-slate-500 text-white">Type: {type}</Chip>}
        {points && (
          <Chip className="bg-slate-500 text-white">Points: {points}</Chip>
        )}
        {rank && <Chip className="bg-slate-500 text-white">Rank: {rank}</Chip>}
      </div>
    </div>
  );
};

export default CricketerCard;
