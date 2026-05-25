import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/constants";
import {
  Home,
  NotFound,
  ServerError,
  Tokens,
  Transactions,
  Wallet,
} from "@/pages";
import { AppLayout } from "@/components";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ServerError />,
    children: [
      { path: ROUTES.HOME, element: <Home /> },
      {
        path: `${ROUTES.WALLET}/*`,
        element: <Wallet />,
        children: [
          { path: "", element: <Tokens /> },
          { path: "transactions", element: <Transactions /> },
          { path: "*", element: <NotFound /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
