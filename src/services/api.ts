import { buildRoute, ROUTES, SYMBOL_MAP, type ChainKey } from "@/constants";
import type {
  BalanceResponse,
  TokensResponse,
  TransactionsResponse,
} from "@/types";

async function fetchJson<T>(input: RequestInfo): Promise<T> {
  const res = await fetch(input);

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data as T;
}

export const api = {
  getBalance: (address: string, chain = "ethereum") =>
    fetchJson<BalanceResponse>(
      buildRoute(ROUTES.API.GET_BALANCE, { address }, { chain }),
    ),

  getTransactions: (
    address: string,
    chain = "ethereum",
    pageKey: string | null,
  ) =>
    fetchJson<TransactionsResponse>(
      buildRoute(
        ROUTES.API.GET_TRANSACTIONS,
        { address },
        { chain, ...(pageKey && { pageKey }) },
      ),
    ),

  getTokens: (address: string, chain = "ethereum") =>
    fetchJson<TokensResponse>(
      buildRoute(ROUTES.API.GET_TOKENS, { address }, { chain }),
    ),

  getPrice: async (chain: ChainKey): Promise<number> => {
    const res = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${SYMBOL_MAP[chain]}`,
    );

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(`Failed to fetch price for ${chain}`);
    }

    return parseFloat(data.price);
  },

  getHealth: () => fetchJson<number>(ROUTES.API.HEALTH),
};
