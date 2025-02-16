import { useContext } from "react";
import AppContext from "../context/AppContext";
import { AppContextType } from "../types";

/**
 * useApp Hook
 *
 * Provides access to the application context.
 *
 * @returns {AppContextType} The current application context
 *
 * @throws {Error} Throws an error if the context is undefined
 */
const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("App Context Undefined");
  }
  return context;
};

export default useApp;
