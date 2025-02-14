import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AppProvider from "./context/provider/AppProvider";
import ThemeProvider from "./context/provider/ThemeProvider";

function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <Header />
        <Outlet />
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
