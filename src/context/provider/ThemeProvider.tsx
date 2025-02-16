import { useEffect, useState } from "react";
import { ThemeOptions, ThemeProviderProps } from "../../types";
import { darkTheme, lightTheme } from "../../config/themes";
import ThemeContext from "../ThemeContext";
import useApp from "../../hooks/useApp";

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeOptions>(lightTheme);
  const { preferences } = useApp();

  useEffect(() => {
    setTheme(preferences.theme === "light" ? lightTheme : darkTheme);
  }, [preferences.theme]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
