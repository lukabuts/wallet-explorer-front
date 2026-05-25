import { buildRoute, ROUTES, SYMBOL_MAP, type ChainKey } from "@/constants";

export const api = {
  getBalance: (address: string, chain = "ethereum") =>
    fetch(buildRoute(ROUTES.API.GET_BALANCE, { address }, { chain })).then(
      (r) => r.json(),
    ),

  getTransactions: (address: string, chain = "ethereum", pageKey?: string) =>
    fetch(
      buildRoute(
        ROUTES.API.GET_TRANSACTIONS,
        { address },
        { chain, ...(pageKey && { pageKey }) },
      ),
    ).then((r) => r.json()),

  getTokens: (address: string, chain = "ethereum") =>
    fetch(buildRoute(ROUTES.API.GET_TOKENS, { address }, { chain })).then((r) =>
      r.json(),
    ),

  getPrice: async (chain: ChainKey): Promise<number> => {
    const res = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${SYMBOL_MAP[chain]}`,
    );
    if (!res.ok) throw new Error(`Failed to fetch price for ${chain}`);
    const data = await res.json();
    return parseFloat(data.price);
  },
};
