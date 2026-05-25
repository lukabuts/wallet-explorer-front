import { Link } from "react-router-dom";
import { ROUTES } from "@/constants";

export const NotFound = ({
  title,
  message,
  fullScreen = true,
}: {
  title?: string;
  message?: string;
  fullScreen?: boolean;
}) => {
  return (
    <div
      className={
        fullScreen
          ? "fixed w-dvw h-dvh bg-[#090909] flex flex-col items-center  text-center px-6 pt-76"
          : "flex flex-col items-center  text-center px-6 pt-76"
      }
    >
      <p className="text-3xl font-bold uppercase tracking-widest text-gray-600 mb-4">
        404
      </p>
      <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3">
        {title || "Page Not Found"}
      </h1>
      <p className="text-gray-500 text-[14px] max-w-xs leading-relaxed mb-8">
        {message ||
          "The page you are looking for does not exist or has been moved."}
      </p>
      <Link
        to={ROUTES.HOME}
        className="px-6 py-2.5 rounded-lg border border-orange-500 text-orange-400 text-[13px] font-bold hover:bg-orange-500/10 transition-all"
      >
        Back to home
      </Link>
    </div>
  );
};
