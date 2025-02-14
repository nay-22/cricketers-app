import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { ThemeOptions } from "../types";

const useTheme = (): ThemeOptions => {
  const theme = useContext(ThemeContext);
  return theme;
};

export default useTheme;
