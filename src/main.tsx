import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cricketers from "./pages/Cricketers.tsx";
import Error from "./pages/Error.tsx";
import CricketerDetails from "./pages/CricketerDetails.tsx";

const router = createBrowserRouter([
  {
    errorElement: <Error />,
    children: [
      { path: "/", element: <Cricketers /> },
      { path: "cricketer/:id", element: <CricketerDetails /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
