import { useContext } from "react";
import Switch from "./Switch";
import AppContext from "../context/AppContext";

const Header = () => {
  const context = useContext(AppContext);

  const toggleTheme = () => {
    context?.setApp(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark'
    }))
  }

  return <div className="bg-slate-300 p-4 flex items-center justify-between">
    <div>CricketZ</div>
    <div><Switch on={context?.app.theme === 'dark'} onClick={toggleTheme} /></div>
  </div>;
};

export default Header;
