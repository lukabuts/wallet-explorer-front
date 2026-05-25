import type { NotificationStore } from "@/types";
import { create } from "zustand";

let timeout: ReturnType<typeof setTimeout>;

export const useNotificationStore = create<NotificationStore>((set) => ({
  message: "",
  type: "success",
  visible: false,
  show: (message, type = "success") => {
    clearTimeout(timeout);
    set({ message, type, visible: true });
    timeout = setTimeout(() => set({ visible: false }), 2800);
  },
  hide: () => set({ visible: false }),
}));
