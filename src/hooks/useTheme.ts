import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { ThemeOptions } from "../types";

/**
 * useTheme Hook
 *
 * Provides access to the theme context.
 *
 * @returns {ThemeOptions} The current theme options
 */
const useTheme = (): ThemeOptions => {
  const theme = useContext(ThemeContext);
  return theme;
};

export default useTheme;
