import { FoxLogo, JazzAvatar, LiveDot } from "@/assets/icons";
import { CopyButton } from "@/components";
import { buildRoute, ROUTES } from "@/constants";
import { useBalance, usePrice } from "@/hooks";
import { useAddressStore } from "@/store";
import { shortAddr } from "@/utils";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function AddrBalance({ addr }: { addr: string }) {
  const { data, isLoading, isError } = useBalance(addr);
  const { setTotalBalance } = useAddressStore();
  const {
    data: priceData,
    isLoading: isPriceLoading,
    isError: isPriceError,
  } = usePrice("ethereum");

  useEffect(() => {
    if (data?.balance) {
      setTotalBalance(parseFloat(data.balance));
    }
  }, [data?.balance, setTotalBalance]);

  if (isLoading || isPriceLoading)
    return <span className="text-[13px] text-gray-500">Loading...</span>;
  if (isError || isPriceError)
    return <span className="text-[13px] text-red-400">Error</span>;

  if (data)
    return (
      <div className="text-right">
        <p className="text-[13px] font-bold text-gray-200">
          {parseFloat(data.balance).toFixed(4)}
          ETH
        </p>
        <p className="text-[11px] text-gray-600">
          {priceData ? (priceData * Number(data?.balance)).toFixed(2) : "N/A"}{" "}
          USD
        </p>
      </div>
    );
}
export function WalletPanel() {
  const { addresses, connectWallet, totalBalance } = useAddressStore();
  const isConnected = addresses.length > 0;

  return (
    <section className="max-w-2xl mx-auto px-6">
      <div className="flex items-center gap-3 mb-4">
        <p className="text-[10px] font-bold tracking-widest uppercase text-gray-600">
          Your Wallet
        </p>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      <div className="bg-[#111] border border-white/8 rounded-xl">
        {!isConnected ? (
          <div className="flex flex-col items-center text-center py-12 px-6">
            <div className="mb-5 opacity-30">
              <FoxLogo size={52} />
            </div>
            <h3 className="text-gray-500 text-[15px] font-bold mb-2">
              No wallet connected
            </h3>
            <p className="text-gray-700 text-[13px] mb-6 max-w-xs leading-relaxed">
              Connect your MetaMask to view your accounts, balances, and
              transaction history.
            </p>
            <button
              onClick={connectWallet}
              className="flex items-center gap-2 px-7 py-3 rounded-lg bg-orange-500 text-black text-[14px] font-bold hover:bg-orange-400 active:scale-95 transition-all"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              Connect MetaMask
            </button>
          </div>
        ) : (
          <div className="p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-emerald-400 text-[12px] font-bold">
                <LiveDot /> Connected · Mainnet
              </div>
              <span className="text-[11px] text-gray-600">
                {addresses.length} accounts
              </span>
            </div>

            {/* Account rows */}
            <div className="flex flex-col gap-2">
              {addresses.map((addr) => (
                <div
                  key={addr}
                  className="flex items-center justify-between bg-[#0d0d0d] border border-white/5 rounded-xl px-4 py-3 hover:border-white/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <JazzAvatar address={addr} size={36} />
                    <div>
                      <Link
                        to={buildRoute(ROUTES.WALLET, { address: addr })}
                        className="text-[13px] font-semibold text-gray-200 hover:underline"
                      >
                        Account {addresses.indexOf(addr) + 1}
                      </Link>
                      <p className="text-[11px] text-gray-600">
                        {shortAddr(addr)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <AddrBalance addr={addr} />
                    <CopyButton text={addr} />
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-600">
                Total Balance
              </span>
              <span className="text-orange-400 font-bold text-[16px]">
                {totalBalance.toFixed(4)} ETH
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
