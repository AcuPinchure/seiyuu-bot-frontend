/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import Error from "./Error";
import { lazy } from "react";
import SuspenseWrapper from "@/components/SuspenseWrapper";
import Logout from "./Logout";

const Stats = lazy(() => import("./Stats"));
const Status = lazy(() => import("./Status"));
const Login = lazy(() => import("./Login"));
const Library = lazy(() => import("./Library"));
const Logs = lazy(() => import("./Logs"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "stats",

        element: (
          <SuspenseWrapper>
            <Stats />
          </SuspenseWrapper>
        ),
      },
      {
        path: "status",
        element: (
          <SuspenseWrapper>
            <Status />
          </SuspenseWrapper>
        ),
      },
      {
        path: "login",
        element: (
          <SuspenseWrapper>
            <Login />
          </SuspenseWrapper>
        ),
      },
      {
        path: "library",
        element: (
          <SuspenseWrapper>
            <Library />
          </SuspenseWrapper>
        ),
      },
      {
        path: "logs/*",
        element: (
          <SuspenseWrapper>
            <Logs />
          </SuspenseWrapper>
        ),
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },
]);

export default router;
