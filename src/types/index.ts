import {
  ComponentType,
  CSSProperties,
  Dispatch,
  ReactNode,
  SetStateAction,
} from "react";

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
  border?: ThemeType | undefined;
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

export type ThemeProviderProps = {
  children: ReactNode;
};

export type LoaderProps = {
  type?: "component" | "page";
};

export type ErrorProps = {
  title: string;
  message: string;
};

export type ChipProps = {
  id?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode | string;
};

export type SearchFormProps<T, U, V> = {
  dataFetcher: (q: string) => Promise<T>;
  dataExtractor: (data: T) => U[];
  resultExtractor: (res: U) => V;
  resultView: ComponentType<V>;
  onClick?: (res: U) => void;
  styleOptions?: {
    wrapper?: {
      className?: string;
      style?: CSSProperties;
    };
    icon?: {
      className?: string;
      style?: CSSProperties;
    };
  };
  isDark?: boolean;
};

export type PaginatorProps = {
  items: number;
  limit?: number;
  onClick: (page: number, limit: number) => void;
  showControls?: boolean;
  showJumpControls?: boolean;
  styleOptions?: {
    wrapper?: {
      style?: CSSProperties;
      className?: string;
    };
    icons?: {
      style?: CSSProperties;
      className?: string;
    };
  };
};

export type SwitchProps = {
  on: boolean;
  onClick: () => void;
  icon?: ReactNode;
};
