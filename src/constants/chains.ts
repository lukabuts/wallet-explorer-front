export const SUPPORTED_CHAINS = ["ethereum", "polygon", "bnb"] as const;
export type ChainKey = (typeof SUPPORTED_CHAINS)[number];

export const CHAIN_LABELS: Record<ChainKey, string> = {
  ethereum: "ETH",
  polygon: "POL",
  bnb: "BNB",
};

export const SYMBOL_MAP: Record<ChainKey, string> = {
  ethereum: "ETHUSDT",
  polygon: "MATICUSDT",
  bnb: "BNBUSDT",
};
