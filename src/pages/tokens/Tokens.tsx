import { useTokens } from "@/hooks";
import { useOutletContext, useParams } from "react-router-dom";
import type { ChainKey } from "@/constants";

export const Tokens = () => {
  const { address } = useParams();
  const { chain } = useOutletContext<{ chain: ChainKey }>();
  const { data, isLoading, isError } = useTokens(address!, chain);

  if (isLoading)
    return <p className="text-gray-600 text-sm">Loading tokens...</p>;
  if (isError)
    return <p className="text-red-400 text-sm">Failed to load tokens</p>;
  if (!data?.tokens.length)
    return <p className="text-gray-600 text-sm">No tokens found</p>;

  return (
    <div className="flex flex-col gap-2">
      {data.tokens.map((token) => (
        <div
          key={token.contractAddress}
          className="flex items-center justify-between bg-white/5 border border-white/8 rounded-xl px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-gray-400">
              {token.symbol?.slice(0, 2) ?? "?"}
            </div>

            <div>
              <p className="text-[13px] font-semibold text-gray-200">
                {token.name ?? "Unknown"}
              </p>
              <p className="text-[11px] text-gray-600">{token.symbol}</p>
            </div>
          </div>
          <p className="text-[13px] font-mono text-gray-300">
            {parseFloat(token.balance).toFixed(4)}
          </p>
        </div>
      ))}
    </div>
  );
};
