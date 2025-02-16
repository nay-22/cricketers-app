import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import useTheme from "./hooks/useTheme";

function App() {
  const theme = useTheme();

  return (
    <div className={`h-screen ${theme.background?.primary} `}>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
