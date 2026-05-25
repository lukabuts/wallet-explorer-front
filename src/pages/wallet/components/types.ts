import type { ChainKey } from "@/constants";

export interface BalanceDataProps {
  chain: ChainKey;
  address: string;
}

export interface ChainSelectorProps {
  value: ChainKey;
  onChange: (chain: ChainKey) => void;
}
