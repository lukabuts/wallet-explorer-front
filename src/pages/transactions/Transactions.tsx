import { useTransactions } from "@/hooks";
import { useOutletContext, useParams } from "react-router-dom";
import type { ChainKey } from "@/constants";
import { NavButtons, TransactionItem } from "./components";
import { PulsingCard } from "@/components";
import { useState } from "react";

export const Transactions = () => {
  const { address } = useParams();
  const { chain } = useOutletContext<{ chain: ChainKey }>();
  const [pageKeys, setPageKeys] = useState<(string | null)[]>([null]);
  const [pageIndex, setPageIndex] = useState(0);
  const [prevChain, setPrevChain] = useState(chain);
  const [prevAddress, setPrevAddress] = useState(address);

  if (chain !== prevChain || address !== prevAddress) {
    setPageKeys([null]);
    setPageIndex(0);
    setPrevChain(chain);
    setPrevAddress(address);
  }

  const pageKey = pageKeys[pageIndex];

  const { data, isLoading, isError } = useTransactions(
    address!,
    chain,
    pageKey,
  );

  if (isError)
    return (
      <p className="text-red-400 text-sm text-center">
        Failed to load transactions
      </p>
    );

  return (
    <div className="flex flex-col gap-2">
      {isLoading ? (
        <PulsingCard />
      ) : !data?.transactions.length ? (
        <p className="text-gray-600 text-sm text-center">
          No transactions found
        </p>
      ) : (
        <div className="max-h-wallet-content overflow-y-auto space-y-2">
          {data.transactions.map((tx) => (
            <TransactionItem
              key={`${tx.hash}-${chain}-${tx.blockNumber}-${tx.from}-${tx.to}`}
              tx={tx}
              chain={chain}
            />
          ))}
        </div>
      )}
      {!isLoading && !!data?.transactions.length && (
        <NavButtons
          nextPageKey={data.nextPageKey}
          pageIndex={pageIndex}
          setPageKeys={setPageKeys}
          setPageIndex={setPageIndex}
        />
      )}
    </div>
  );
};
