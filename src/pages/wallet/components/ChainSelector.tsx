import { CHAIN_LABELS, SUPPORTED_CHAINS } from "@/constants";
import type { ChainSelectorProps } from "./types";

export const ChainSelector = ({ value, onChange }: ChainSelectorProps) => (
  <div className="flex gap-1 bg-white/5 p-1 rounded-lg">
    {SUPPORTED_CHAINS.map((chain) => (
      <button
        key={chain}
        onClick={() => onChange(chain)}
        className={`px-3 py-1 rounded-md text-[12px] font-bold transition-all ${
          value === chain
            ? "bg-white/10 text-white"
            : "text-gray-500 hover:text-gray-300"
        }`}
      >
        {CHAIN_LABELS[chain]}
      </button>
    ))}
  </div>
);
