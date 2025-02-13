import { useContext } from "react";
import Switch from "./Switch";
import AppContext from "../context/AppContext";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const context = useContext(AppContext);

  const toggleTheme = () => {
    context?.setPreferences((prev) => ({
      ...prev,
      theme: prev.theme === "dark" ? "light" : "dark",
    }));
  };

  const path = useLocation().pathname;

  return (
    <div className="shadow-md md:shadow-lg p-4 flex items-center justify-between">
      <div className="flex items-center justify-start gap-2">
        {path !== "/" && (
          <Link
            to="/"
            className="hover:cursor-pointer hover:bg-slate-300 w-8 h-6 flex items-center justify-center rounded-lg"
          >
            <div className="h-2.5 w-2.5 border-t-3 border-l-3 rounded-tl-sm -rotate-45 border-gray-700"></div>
          </Link>
        )}
        <div className="font-bold text-amber-500">CricketZ</div>
      </div>
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
