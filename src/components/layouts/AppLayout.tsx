import { Outlet } from "react-router-dom";
import { Header } from "../ui";

export const AppLayout = () => {
  return (
    <div className="min-h-dvh">
      <Header />
      <div className="lg:px-10 px-4 pt-4">
        <Outlet />
      </div>
    </div>
  );
};
