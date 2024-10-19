import { createBrowserRouter } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/Signup";
import ProtectedRoute from "./middleware/ProtectedRoute";
import App from "./App";
import Users from "./components/users/Users";
import Resources from "./components/resources/Resources";
import NotFound from "./components/NotFound";
import React from "react";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "resources",
        element: <Resources />,
      },
    ],
  },
  {
    path: "*",

    element: <NotFound />,
  },
]);
