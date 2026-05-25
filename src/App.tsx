import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import { Notification } from "./components";
import { useEffect } from "react";
import { useAddressStore } from "@/store";

function App() {
  const { handleAccountsChanged } = useAddressStore();

  useEffect(() => {
    if (!window.ethereum) return;
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, [handleAccountsChanged]);

  return (
    <>
      <RouterProvider router={router} />
      <Notification />
    </>
  );
}

export default App;
