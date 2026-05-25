import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/constants";
import { Home, NotFound, Tokens, Transactions, Wallet } from "@/pages";
import { AppLayout } from "@/components";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
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
