import { ReactNode, useEffect, useState } from "react";
import { App } from "../../types";
import AppContext from "../AppContext";
import getPlayers from "../../api/get-players";

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [app, setApp] = useState<App>({
    filterType: "all",
    sort: {
      by: "none",
      type: "asc",
    },
    players: [],
    theme: "light",
  });

  useEffect(() => {
    const fetchCriketers = async () => {
      const players = await getPlayers();
      setApp(prev => ({ ...prev, players }))
    }

    fetchCriketers();
  }, []);

  return (
    <AppContext.Provider value={{ app, setApp }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
