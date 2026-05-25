import { LOCAL_STORAGE_KEYS } from "@/constants";
import type { AddressStore } from "@/types";
import { ethers } from "ethers";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useNotificationStore } from "./notificationStore";

export const useAddressStore = create<AddressStore>()(
  persist(
    (set) => ({
      addresses: [],
      totalBalance: 0,

      setTotalBalance: (amount: number) =>
        set((state) => ({ totalBalance: state.totalBalance + amount })),
      setAddresses: (addresses) => set({ addresses }),

      connectWallet: async () => {
        const show = useNotificationStore.getState().show;

        if (!window.ethereum) {
          show("MetaMask is not installed.", "error");
          return;
        }
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send("eth_requestAccounts", []);
          set({ addresses: accounts });
          show("Wallet connected successfully!");
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error:", error.message);
            show(error.message, "error");
          } else {
            show("Something went wrong, please try again", "error");
          }
        }
      },

      handleAccountsChanged: (accounts: string[]) => {
        const show = useNotificationStore.getState().show;
        if (accounts.length === 0) {
          set({ addresses: [] });
          show("Wallet disconnected", "info");
        } else {
          set({ addresses: accounts });
          show("Account changed", "info");
        }
      },
      disconnectWallet: async () => {
        const show = useNotificationStore.getState().show;

        try {
          if (window.ethereum) {
            await window.ethereum.request({
              method: "wallet_revokePermissions",
              params: [{ eth_accounts: {} }],
            });
          }
        } catch (error) {
          console.warn("Could not revoke permissions:", error);
        } finally {
          set({ addresses: [] });
          show("Wallet disconnected", "info");
        }
      },
    }),
    { name: LOCAL_STORAGE_KEYS.CONNECTED_ADDRESSES },
  ),
);
