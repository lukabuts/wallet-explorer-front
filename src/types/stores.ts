import type { NotificationType } from "./app";

export interface AddressStore {
  addresses: string[];
  setAddresses: (addresses: string[]) => void;
  connectWallet: () => Promise<void>;
  handleAccountsChanged: (accounts: string[]) => void;
  disconnectWallet: () => Promise<void>;
  totalBalance: number;
  setTotalBalance: (amount: number) => void;
}

export interface NotificationStore {
  message: string;
  type: NotificationType;
  visible: boolean;
  show: (message: string, type?: NotificationType) => void;
  hide: () => void;
}
