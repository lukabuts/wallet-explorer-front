import { CHAIN_LABELS } from "@/constants";
import type { BalanceDataProps } from "./types";
import { useBalance, usePrice } from "@/hooks";

export function BalanceData({ chain, address }: BalanceDataProps) {
  const {
    data: balanceData,
    isLoading: isBalanceLoading,
    isError: isBalanceError,
    error: balanceError,
  } = useBalance(address!, chain);
  const {
    data: priceData,
    isLoading: isPriceLoading,
    isError: isPriceError,
  } = usePrice(chain);

  if (isBalanceLoading || isPriceLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-9 w-48 bg-white/10 rounded-lg mb-2" />
        <div className="h-4 w-24 bg-white/5 rounded-md" />
      </div>
    );
  }

  if (isBalanceError) {
    return <p className="text-red-400 text-sm">{balanceError.message}</p>;
  }

  if (!balanceData) return null;

  const usdValue = priceData
    ? (parseFloat(balanceData.balance) * priceData).toFixed(2)
    : null;

  return (
    <>
      <p className="text-3xl font-bold text-white tracking-tight">
        {parseFloat(balanceData.balance).toFixed(4)}
        <span className="text-orange-400 text-xl ml-2">
          {CHAIN_LABELS[chain]}
        </span>
      </p>
      {isPriceError ? (
        <p className="text-[13px] text-red-400/70 mt-1">
          Failed to load USD value
        </p>
      ) : usdValue ? (
        <p className="text-[13px] text-gray-500 mt-1">${usdValue} USD</p>
      ) : null}
    </>
  );
}
