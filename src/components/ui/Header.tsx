import { FoxLogo, LiveDot, WalletIcon } from "@/assets/icons";
import { buildRoute, ROUTES } from "@/constants";
import { useAddressStore } from "@/store";
import { shortAddr } from "@/utils";
import { Link } from "react-router-dom";

export const Header = () => {
  const { addresses, connectWallet, disconnectWallet } = useAddressStore();
  const isConnected = addresses.length > 0;
  const active = addresses[0];
  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-black-primary">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5">
        <Link to={ROUTES.HOME} className="flex items-center gap-3">
          <FoxLogo size={30} />
          <span
            className="text-[17px] font-extrabold tracking-tight text-gray-100"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            Meta<span className="text-orange-400">Scan</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-7 list-none">
          <li>
            <Link
              to={ROUTES.HOME}
              className="text-[12px] font-bold uppercase tracking-widest text-gray-500 hover:text-gray-300 transition-colors no-underline"
            >
              Home
            </Link>
          </li>
        </ul>

        {isConnected ? (
          <div className="flex items-center gap-3">
            <Link
              to={buildRoute(ROUTES.WALLET, { address: active })}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-orange-500/30 bg-orange-500/10 text-orange-400 text-[13px] font-bold hover:underline"
            >
              <LiveDot />
              {shortAddr(active)}
            </Link>
            <button
              onClick={disconnectWallet}
              className="px-3 py-2 rounded-lg border border-white/10 text-gray-500 text-[12px] font-bold hover:text-gray-300 hover:border-white/20 transition-all"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="flex items-center gap-2 px-5 py-2 rounded-lg border border-orange-500 text-orange-400 text-[13px] font-bold hover:bg-orange-500/10 transition-all"
          >
            <WalletIcon />
            Connect Wallet
          </button>
        )}
      </nav>
    </header>
  );
};
