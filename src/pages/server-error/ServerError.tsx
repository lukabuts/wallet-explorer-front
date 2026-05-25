import { Link, useRouteError } from "react-router-dom";
import { ROUTES } from "@/constants";

export const ServerError = () => {
  const error = useRouteError() as Error | undefined;

  return (
    <div className="fixed w-dvw h-dvh bg-[#090909] flex flex-col items-center  text-center px-6 pt-76">
      <p className="text-3xl font-bold uppercase tracking-widest text-gray-600 mb-4">
        500
      </p>
      <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3">
        Something went wrong
      </h1>
      <p className="text-gray-500 text-[14px] max-w-xs leading-relaxed mb-3">
        The server returned an unexpected error. Please try again later.
      </p>
      {error?.message && (
        <p className="text-red-400/70 text-[12px] font-mono bg-red-500/5 border border-red-500/10 rounded-lg px-4 py-2 mb-8 max-w-sm break-all">
          {error.message}
        </p>
      )}
      <div className="flex gap-3">
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 rounded-lg bg-orange-500 text-black text-[13px] font-bold hover:bg-orange-400 transition-all"
        >
          Try again
        </button>
        <Link
          to={ROUTES.HOME}
          className="px-6 py-2.5 rounded-lg border border-white/10 text-gray-400 text-[13px] font-bold hover:border-white/20 hover:text-gray-300 transition-all"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};
