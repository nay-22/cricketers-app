import { ReactNode, useState } from "react";
import { App } from "../../types";
import AppContext from "../AppContext";

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
  return (
    <AppContext.Provider value={{ app, setApp }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
