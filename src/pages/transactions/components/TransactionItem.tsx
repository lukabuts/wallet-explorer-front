import { ChevronIcon } from "@/assets/icons";
import { CopyButton } from "@/components";
import { CHAIN_LABELS, type ChainKey } from "@/constants";
import type { TokenTransfer } from "@/types";
import { useState } from "react";

export function TransactionItem({
  tx,
  chain,
}: {
  tx: TokenTransfer;
  chain: ChainKey;
}) {
  const [open, setOpen] = useState(false);
  const chainLabel = CHAIN_LABELS[chain] || chain.toUpperCase();

  const blockNumber = tx.blockNumber
    ? parseInt(tx.blockNumber, 16).toLocaleString()
    : "—";

  return (
    <div className="bg-white/5 border border-white/8 rounded-xl px-4 py-3">
      {/* Collapsed row — always visible */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-gray-500 shrink-0">
            <ChevronIcon open={open} />
          </span>
          <p className="text-[12px] font-mono text-gray-500 truncate">
            {tx.hash}
          </p>
        </div>
        <p className="text-[13px] font-semibold text-orange-400 shrink-0 ml-4">
          {parseFloat(tx.value).toFixed(6)} {chainLabel}
        </p>
      </div>

      {/* Expanded details */}
      {open && (
        <div className="mt-3 pt-3 border-t border-white/8 flex flex-col gap-2">
          {[
            { label: "Hash", value: tx.hash },
            { label: "From", value: tx.from },
            { label: "To", value: tx.to ?? "—" },
            { label: "Block", value: blockNumber, noCopy: true },
            { label: "Asset", value: chainLabel, noCopy: true },
            {
              label: "Value",
              value: `${tx.value} ${chainLabel}`,
              noCopy: true,
            },
          ].map(({ label, value, noCopy }) => (
            <div key={label} className="flex items-start justify-between gap-4">
              <p className="text-[11px] text-gray-600 uppercase tracking-widest shrink-0 w-14">
                {label}
              </p>
              <div className="flex items-center min-w-0">
                <p className="text-[12px] font-mono text-gray-300 break-all">
                  {value}
                </p>
                {!noCopy && <CopyButton text={value} />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
