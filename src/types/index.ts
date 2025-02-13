import { Dispatch, SetStateAction } from "react";

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

export type FilterType = "all" | TPlayerType;

export type SortType = {
  by: "none" | "name" | "rank" | "age";
  type: "asc" | "dsc";
};

export type App = {
  players: TPlayer[];
  filterType: FilterType;
  sort: SortType;
  theme: "light" | "dark";
};

export type AppContextType = {
  app: App;
  setApp: Dispatch<SetStateAction<App>>;
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
