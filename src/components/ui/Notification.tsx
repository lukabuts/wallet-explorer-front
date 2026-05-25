import { useNotificationStore } from "@/store/notificationStore";
export function Notification() {
  const { message, type, visible, hide } = useNotificationStore();

  const styles = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const s = styles[type];

  return (
    <div
      onClick={hide}
      className={`fixed bottom-5 right-5 z-50 flex items-start gap-3 px-4 py-3 border rounded-xl max-w-sm cursor-pointer transition-all duration-300 ${visible ? "translate-x-0 right-5 opacity-100" : "translate-x-[120%] -right-5 shadow-2xl opacity-0"} ${s}`}
    >
      <div className="flex-1">
        <p className="font-medium text-sm m-0 capitalize">{type}</p>
        <p className="text-sm opacity-80 m-0">{message}</p>
      </div>
      <i className="ti ti-x text-base opacity-50" />
    </div>
  );
}
