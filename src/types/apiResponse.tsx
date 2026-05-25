export type BalanceResponse = {
  address: string;
  balance: string;
};

export type TokenTransfer = {
  hash: string;
  from: string;
  to: string;
  value: string;
  asset: string | null;
  blockNumber: string;
};

export type TransactionsResponse = {
  transactions: TokenTransfer[];
  nextPageKey: string | null;
};

export type Token = {
  contractAddress: string;
  name: string | null;
  symbol: string | null;
  decimals: number | null;
  balance: string;
};

export type TokensResponse = {
  tokens: Token[];
};
