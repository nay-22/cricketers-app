import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cricketers from "./pages/Cricketers.tsx";
import App from "./App.tsx";
import Loader from "./components/Loader.tsx";
import AppProvider from "./context/provider/AppProvider.tsx";
import ThemeProvider from "./context/provider/ThemeProvider.tsx";

const Error = lazy(() => import("./pages/Error.tsx"));

const CricketerDetails = lazy(() => import("./pages/CricketerDetails.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <Suspense fallback={<Loader type="page" />}>
        <Error title="404" message="Oops! Page not found." />
      </Suspense>
    ),
    children: [
      { index: true, element: <Cricketers /> },
      {
        path: "cricketer/:id",
        element: (
          <Suspense fallback={<Loader type="page" />}>
            <CricketerDetails />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AppProvider>
  </StrictMode>
);
