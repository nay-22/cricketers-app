import { ReactNode, useEffect, useState } from "react";
import { App, Preferences, SortType, TPlayer } from "../../types";
import AppContext from "../AppContext";
import getPlayers from "../../api/get-players";

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [app, setApp] = useState<App>({
    players: [],
  });

  const [preferences, setPreferences] = useState<Preferences>({
    filterType: undefined,
    sort: {
      by: "none",
      type: "asc",
    },
    theme: "light",
  });

  const fetchCriketers = async () => {
    const players = await getPlayers({ type: preferences.filterType });
    setApp((prev) => ({ ...prev, players }));
  };

  const getSorted = (players: TPlayer[], sort: SortType): TPlayer[] => {
    switch (sort.by) {
      case "name":
        return [...players].sort((a, b) =>
          sort.type === "asc"
            ? (a.name ?? "").localeCompare(b.name ?? "")
            : (b.name ?? "").localeCompare(a.name ?? "")
        );

      case "rank":
        return [...players].sort((a, b) =>
          sort.type === "asc"
            ? (a.rank ?? Infinity) - (b.rank ?? Infinity)
            : (b.rank ?? -Infinity) - (a.rank ?? -Infinity)
        );

      case "age":
        return [...players].sort((a, b) =>
          sort.type === "asc"
            ? (b.dob ?? Infinity) - (a.dob ?? Infinity)
            : (a.dob ?? Infinity) - (b.dob ?? Infinity)
        );

      default:
        return players;
    }
  };

  useEffect(() => {
    fetchCriketers();
  }, [preferences.filterType]);

  useEffect(() => {
    setApp((prev) => ({
      ...prev,
      players: getSorted([...prev.players], preferences.sort),
    }));
  }, [preferences.sort]);

  return (
    <AppContext.Provider value={{ app, setApp, preferences, setPreferences }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
