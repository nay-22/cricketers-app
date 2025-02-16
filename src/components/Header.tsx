import { lazy, Suspense } from "react";
import Switch from "./Switch";
import { Link, useLocation } from "react-router-dom";
import SearchForm from "./forms/SearchForm";
import { TPlayer } from "../types";
import searchPlayers from "../api/search-players";
import useTheme from "../hooks/useTheme";
import useApp from "../hooks/useApp";
import Loader from "./Loader";

const ResultView = lazy(() => import("./SearchResultView"));

const Header = () => {
  const { preferences, setPreferences } = useApp();

  const toggleTheme = () => {
    setPreferences((prev) => ({
      ...prev,
      theme: prev.theme === "dark" ? "light" : "dark",
    }));
  };

  const theme = useTheme();

  const path = useLocation().pathname;

  return (
    <div
      className={`shadow-md md:shadow-lg md:px-12 p-4 flex items-center gap-4 justify-between ${theme.background?.secondary} ${theme.text?.primary}`}
    >
      <div className="flex items-center justify-start gap-2">
        {path !== "/" && (
          <Link
            data-testid="Back/Home"
            to="/"
            className="hover:cursor-pointer hover:bg-slate-300 w-8 h-6 flex items-center justify-center rounded-lg"
            aria-label="Back/Home"
          >
            <div
              className={`h-2.5 w-2.5 border-t-3 border-l-3 rounded-tl-sm -rotate-45 ${theme.text?.primary}`}
            ></div>
          </Link>
        )}
        <div
          className={`font-bold text-amber-400 bg-slate-800 p-2.5 rounded-lg`}
        >
          CricketZ
        </div>
      </div>
      <SearchForm<TPlayer[], TPlayer, { name: string; id: string }>
        dataFetcher={searchPlayers}
        dataExtractor={(data) => data}
        resultExtractor={(player) => ({
          name: player.name || "",
          id: player.id || "",
        })}
        resultView={(props) => (
          <Suspense fallback={<Loader />}>
            <ResultView {...props} />
          </Suspense>
        )}
        styleOptions={{
          icon: {
            className:
              preferences.theme === "dark" ? "fill-white" : "fill-black",
          },
          wrapper: {
            className: `${theme.text?.primary} ${theme.background?.primary}`,
          },
        }}
        isDark={preferences.theme === "dark"}
      />

      <div>
        <Switch on={preferences.theme === "dark"} onClick={toggleTheme} />
      </div>
    </div>
  );
};

export default Header;
