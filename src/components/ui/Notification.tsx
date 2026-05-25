import { useNotificationStore } from "@/store/notificationStore";

const STYLES = {
  success: {
    container: "bg-[#111] border-emerald-500/20",
    title: "text-emerald-400",
    message: "text-gray-400",
    dot: "bg-emerald-400",
  },
  error: {
    container: "bg-[#111] border-red-500/20",
    title: "text-red-400",
    message: "text-gray-400",
    dot: "bg-red-400",
  },
  info: {
    container: "bg-[#111] border-white/10",
    title: "text-blue-400",
    message: "text-gray-400",
    dot: "bg-blue-400",
  },
};

export function Notification() {
  const { message, type, visible, hide } = useNotificationStore();
  const s = STYLES[type];

  return (
    <div
      onClick={hide}
      className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 border rounded-xl max-w-sm cursor-pointer transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-3 pointer-events-none"
      } ${s.container}`}
    >
      <span
        className={`w-2 h-2 rounded-full shrink-0 animate-pulse ${s.dot}`}
      />
      <div className="flex-1 min-w-0">
        <p
          className={`text-[12px] font-bold uppercase tracking-widest mb-0.5 ${s.title}`}
        >
          {type}
        </p>
        <p className={`text-[13px] leading-snug truncate ${s.message}`}>
          {message}
        </p>
      </div>
      <i className="ti ti-x text-gray-600 text-base hover:text-gray-300 transition-colors" />
    </div>
  );
}
