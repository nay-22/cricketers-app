import { createContext } from "react";
import { ThemeOptions } from "../types";
import { lightTheme } from "../config/themes";

const ThemeContext = createContext<ThemeOptions>(lightTheme);

export default ThemeContext;