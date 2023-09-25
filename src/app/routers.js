import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "./layout/DefaultLayout";
import { BlankLayout } from "./layout/BlankLayout";
import { Login } from "./modules/auth/entry/Login";
import { userRoutes } from "./modules/user/userRoutes";
import { typeRoutes } from "./modules/type/typeRoute";
import { packageRoutes } from "./modules/package/packageRoute";
import { tourRoutes } from "./modules/tours/tourRoute";
import { itineraryRoutes } from "./modules/itinerary/ItineraryRoutes";
import { visaRoutes } from "./modules/visa/visaRoutes";
import { mediaRoute } from "./modules/media/mediaRoute";

export const routers = createBrowserRouter([
  {
    path: "",
    element: <DefaultLayout />,
    children: [
      ...userRoutes, 
      ...typeRoutes,
      ...packageRoutes,
      ...tourRoutes,
      ...itineraryRoutes,
      ...visaRoutes,
      ...mediaRoute
    ],
  },
  {
    path: "auth",
    element: <BlankLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
