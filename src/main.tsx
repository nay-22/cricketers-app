import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cricketers from "./pages/Cricketers.tsx";
import App from "./App.tsx";

const Error = lazy(() => import("./pages/Error.tsx"));

const CricketerDetails = lazy(() => import("./pages/CricketerDetails.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <Suspense
        fallback={
          <div className="flex items-center justify-center">Loading...</div>
        }
      >
        <Error />
      </Suspense>
    ),
    children: [
      { index: true, element: <Cricketers /> },
      {
        path: "cricketer/:id",
        element: (
          <Suspense
            fallback={
              <div className="flex items-center justify-center">Loading...</div>
            }
          >
            <CricketerDetails />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
