import { FC } from "react";
import { TPlayer } from "../../types";
import Chip from "../Chip";
import getAge from "../../utils/get-age";

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
    <div className="rounded-xl w-full min-w-[250px]">
      <div className="bg-gray-300 rounded-t-xl p-2 flex items-center justify-between">
        {name && (
          <div className="text-lg sm:text-2xl font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
            {name}
          </div>
        )}
        {dob && (
          <div className="font-semibold text-gray-600">
            Age: {getAge(new Date(dob).getTime())}
          </div>
        )}
      </div>
      {description && <div className="p-2">{description}</div>}
      <div className="p-2 bg-gray-300 rounded-b-2xl flex items-center justify-start gap-2">
        {type && (
          <Chip className="bg-amber-400 font-semibold text-xs sm:text-lg">
            Type: {type}
          </Chip>
        )}
        {points && (
          <Chip className="bg-slate-500 text-white text-xs sm:text-lg">
            Points: {points}
          </Chip>
        )}
        {rank && (
          <Chip className="bg-slate-500 text-white text-xs sm:text-lg">
            Rank: {rank}
          </Chip>
        )}
      </div>
    </div>
  );
};

export default CricketerCard;
