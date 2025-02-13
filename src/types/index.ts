import { CSSProperties, Dispatch, SetStateAction } from "react";

export type TMayBe<T> = T | null | undefined;

export type TPlayerType = "batsman" | "bowler" | "allRounder" | "wicketKeeper";

export type TPlayer = {
  id?: TMayBe<string>;
  name?: TMayBe<string>;
  description?: TMayBe<string>;
  type?: TMayBe<TPlayerType>;
  points?: TMayBe<number>;
  rank?: TMayBe<number>;
  dob?: TMayBe<number>;
};

export type SortBy = "none" | "name" | "rank" | "age";
export type SortOrder = "asc" | "dsc";

export type SortType = {
  by: SortBy;
  type: SortOrder;
};

export type App = {
  players: TPlayer[];
};

export type Preferences = {
  filterType: TMayBe<TPlayerType>;
  sort: SortType;
  theme: "light" | "dark";
};

export type AppContextType = {
  app: App;
  setApp: Dispatch<SetStateAction<App>>;
  preferences: Preferences;
  setPreferences: Dispatch<SetStateAction<Preferences>>;
};

export type ThemeType = {
  primary?: string | undefined;
  secondary?: string | undefined;
  tertiary?: string | undefined;
  accent?: string | undefined;
};

export interface BaseThemeOptions {
  text?: ThemeType | undefined;
  background?: ThemeType | undefined;
}

export interface ThemeOptions extends BaseThemeOptions {
  error?: BaseThemeOptions | undefined;
}

export type IconProps = {
  width?: number;
  height?: number;
  style?: CSSProperties;
  className?: string;
};
