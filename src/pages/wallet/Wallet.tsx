import { buildRoute, ROUTES, type ChainKey } from "@/constants";
import { useAddressStore } from "@/store";
import { BalanceData, ChainSelector } from "./components";
import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

const Wallet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { address } = useParams();
  const { addresses } = useAddressStore();
  const [chain, setChain] = useState<ChainKey>("ethereum");

  useEffect(() => {
    if (!address || addresses.length === 0) navigate(ROUTES.HOME);
  }, [address, addresses.length, navigate]);

  const isTransactions = location.pathname.includes("transactions");

  if (!address) return null;

  return (
    <div className="min-h-screen bg-[#090909] text-gray-300 px-6 py-10 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[11px] text-gray-600 uppercase tracking-widest mb-1">
            Wallet
          </p>
          <p className="text-[13px] font-mono text-gray-400 break-all">
            {address}
          </p>
        </div>
        <ChainSelector value={chain} onChange={setChain} />
      </div>

      {/* Balance card */}
      <div className="bg-white/5 border border-white/8 rounded-xl p-5 mb-6">
        <p className="text-[11px] text-gray-600 uppercase tracking-widest mb-2">
          Balance
        </p>
        <BalanceData chain={chain} address={address} />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/8 mb-6">
        {[
          { label: "Tokens", to: buildRoute(ROUTES.WALLET, { address }) },
          {
            label: "Transactions",
            to: buildRoute(ROUTES.WALLET_TRANSACTIONS, { address }),
          },
        ].map(({ label, to }) => {
          const active =
            label === "Transactions" ? isTransactions : !isTransactions;
          return (
            <Link
              key={label}
              to={to}
              className={`px-4 py-2 text-[13px] font-semibold border-b-2 transition-colors -mb-px ${
                active
                  ? "border-orange-400 text-white"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* Tab content — pass chain down via context or outlet context */}
      <Outlet context={{ chain }} />
    </div>
  );
};

export default Wallet;
