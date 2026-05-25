import { useTransactions } from "@/hooks";
import { useOutletContext, useParams } from "react-router-dom";
import type { ChainKey } from "@/constants";
import { TransactionItem } from "./components";

export const Transactions = () => {
  const { address } = useParams();
  const { chain } = useOutletContext<{ chain: ChainKey }>();
  const { data, isLoading, isError } = useTransactions(address!, chain);

  if (isLoading)
    return <p className="text-gray-600 text-sm">Loading transactions...</p>;
  if (isError)
    return <p className="text-red-400 text-sm">Failed to load transactions</p>;
  if (!data?.transactions.length)
    return <p className="text-gray-600 text-sm">No transactions found</p>;

  return (
    <div className="flex flex-col gap-2">
      {data.transactions.map((tx) => (
        <TransactionItem
          key={`${tx.hash}-${chain}-${tx.blockNumber}-${tx.from}-${tx.to}`}
          tx={tx}
          chain={chain}
        />
      ))}
    </div>
  );
};
