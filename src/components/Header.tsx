import { lazy, Suspense, useContext } from "react";
import Switch from "./Switch";
import AppContext from "../context/AppContext";
import { Link, useLocation } from "react-router-dom";
import SearchForm from "./forms/SearchForm";
import { TPlayer } from "../types";
import searchPlayers from "../api/search-players";
import useTheme from "../hooks/useTheme";

const ResultView = lazy(() => import("./SearchResultView"));

const Header = () => {
  const context = useContext(AppContext);

  const toggleTheme = () => {
    context?.setPreferences((prev) => ({
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
            to="/"
            className="hover:cursor-pointer hover:bg-slate-300 w-8 h-6 flex items-center justify-center rounded-lg"
          >
            <div
              className={`h-2.5 w-2.5 border-t-3 border-l-3 rounded-tl-sm -rotate-45 ${theme.text?.primary}`}
            ></div>
          </Link>
        )}
        <div className="font-bold text-amber-500">CricketZ</div>
      </div>
      <SearchForm<TPlayer[], TPlayer, { name: string; id: string }>
        dataFetcher={searchPlayers}
        dataExtractor={(data) => data}
        resultExtractor={(player) => ({
          name: player.name || "",
          id: player.id || "",
        })}
        resultView={(props) => (
          <Suspense
            fallback={
              <div className="p-2 flex items-center justify-center">
                Loading...
              </div>
            }
          >
            <ResultView {...props} />
          </Suspense>
        )}
        styleOptions={{
          icon: {
            className:
              context?.preferences.theme === "dark"
                ? "fill-white"
                : "fill-black",
          },
          wrapper: {
            className: `${theme.text?.primary} ${theme.background?.primary}`,
          },
        }}
        isDark={context?.preferences.theme === "dark"}
      />

      <div>
        <Switch
          on={context?.preferences.theme === "dark"}
          onClick={toggleTheme}
        />
      </div>
    </div>
  );
};

export default Header;
