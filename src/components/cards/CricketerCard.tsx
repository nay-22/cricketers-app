import { FC } from "react";
import { TPlayer } from "../../types";
import Chip from "../Chip";
import getAge from "../../utils/get-age";
import useTheme from "../../hooks/useTheme";

const CricketerCard: FC<TPlayer> = ({
  name,
  description,
  type,
  points,
  rank,
  dob,
}) => {
  const theme = useTheme();
  return (
    <div
      className={`rounded-xl w-full min-w-[250px] ${theme.background?.secondary} ${theme.text?.primary}`}
    >
      <div
        className={`rounded-t-xl p-2 flex items-center justify-between ${theme.background?.tertiary}`}
      >
        {name && (
          <div className="text-lg sm:text-2xl font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
            {name}
          </div>
        )}
        {dob && (
          <div className="font-semibold">
            Age: {getAge(new Date(dob).getTime())}
          </div>
        )}
      </div>
      {description && <div className="p-2">{description}</div>}
      <div className="py-4 px-2 rounded-b-2xl flex items-center justify-start gap-2">
        {type && (
          <Chip
            className={`${theme.background?.accent} font-semibold text-xs sm:text-lg`}
          >
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
