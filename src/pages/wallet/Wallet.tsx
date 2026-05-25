import { buildRoute, ROUTES, type ChainKey } from "@/constants";
import { BalanceData, ChainSelector } from "./components";
import { useState } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { ethers } from "ethers";
import { NotFound } from "../not-found";

export const Wallet = () => {
  const location = useLocation();
  const { address } = useParams();
  const [chain, setChain] = useState<ChainKey>("ethereum");

  if (!ethers.isAddress(address)) {
    return (
      <NotFound
        title="Wallet Not Found"
        message="Invalid wallet address."
        fullScreen={false}
      />
    );
  }

  const isTransactions = location.pathname.includes("transactions");

  if (!address) return null;

  return (
    <div className="bg-black-secondary text-gray-300 p-6 max-w-2xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between max-sm:flex-col gap-2">
        <div>
          <p className="text-[11px] text-gray-600 uppercase tracking-widest mb-1">
            Wallet
          </p>
          <p className="text-[13px] font-mono text-gray-400 break-all">
            {address}
          </p>
        </div>
        <div className="self-end">
          <ChainSelector value={chain} onChange={setChain} />
        </div>
      </div>

      {/* Balance card */}
      <div className="bg-white/5 border border-white/8 rounded-xl p-5">
        <p className="text-[11px] text-gray-600 uppercase tracking-widest mb-2">
          Balance
        </p>
        <BalanceData chain={chain} address={address} />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/8">
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
