import { useContext } from "react";
import AppContext from "../context/AppContext";
import { AppContextType } from "../types";

const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("App Context Undefined");
  }
  return context;
};

export default useApp;
