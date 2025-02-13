import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AppProvider from "./context/provider/AppProvider";

function App() {
  return (
    <AppProvider>
      <Header />
      <Outlet />
    </AppProvider>
  );
}

export default App;
