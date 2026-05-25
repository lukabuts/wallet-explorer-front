const BASE_URL =
  import.meta.env.VITE_API_URL || "https://wallet-api.lukabuts.site";

export const ROUTES = {
  HOME: "/",
  WALLET: "/wallet/:address",
  WALLET_TRANSACTIONS: "/wallet/:address/transactions",
  WALLET_TOKENS: "/wallet/:address/tokens",
  API: {
    GET_BALANCE: `${BASE_URL}/api/wallet/:address/balance`,
    GET_TRANSACTIONS: `${BASE_URL}/api/wallet/:address/transactions`,
    GET_TOKENS: `${BASE_URL}/api/wallet/:address/tokens`,
    HEALTH: `${BASE_URL}/api/health`,
  },
} as const;

type Params = Record<string, string | number>;
type Query = Record<string, string | number>;

export const buildRoute = (
  route: string,
  params: Params = {},
  queries?: Query,
): string => {
  const url = Object.entries(params).reduce<string>(
    (path, [key, val]) => path.replace(`:${key}`, String(val)),
    route as unknown as string,
  );
  if (queries) {
    const queryString = new URLSearchParams(
      Object.fromEntries(
        Object.entries(queries).map(([k, v]) => [k, String(v)]),
      ),
    ).toString();
    return `${url}?${queryString}`;
  }
  return url;
};
