import React from "react";
import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
} from "react-router-dom";

import App from "../App";
import { NotRouteFound } from "../components";
import HomePage from "../pages/HomePage/HomePage";
import PersonalizedPage from "../pages/PersonalizedPage/PersonalizedPage";

// Define route objects type
const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" replace />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/personalized",
        element: <PersonalizedPage />,
      },
      {
        path: "*",
        element: <NotRouteFound />,
      },
    ],
  },
];

const appRouter = createBrowserRouter(routes);

export default appRouter;
