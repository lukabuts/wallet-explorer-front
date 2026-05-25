import { Outlet } from "react-router-dom";
import { Header, Spinner } from "../ui";
import { useHealth } from "@/hooks";
import { ServerError } from "@/pages";

export const AppLayout = () => {
  const { isError, isLoading } = useHealth();

  if (isLoading) return <Spinner />;
  if (isError) return <ServerError />;
  return (
    <div className="min-h-dvh">
      <Header />
      <div className="lg:px-10 lg:py-4 px-4 py-5">
        <Outlet />
      </div>
    </div>
  );
};
