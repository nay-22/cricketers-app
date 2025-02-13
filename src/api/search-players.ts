import data from "../constants/players";
import { TPlayer } from "../types";
import computeSimilarityIndex from "../utils/string-similarity";

const searchPlayers = (q: string): Promise<TPlayer[]> => {
  return Promise.resolve<TPlayer[]>(
    (data as TPlayer[]).filter(
      (it) => computeSimilarityIndex(it.name || "", q) >= 0.4
    )
  );
};

export default searchPlayers;
