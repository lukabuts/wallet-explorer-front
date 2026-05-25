import { useQuery } from "@tanstack/react-query";
import { api } from "@/services";
import type {
  BalanceResponse,
  TransactionsResponse,
  TokensResponse,
} from "@/types";
import type { ChainKey } from "@/constants";

export const useBalance = (address: string, chain?: string) =>
  useQuery<BalanceResponse>({
    queryKey: ["balance", address, chain],
    queryFn: () => api.getBalance(address, chain),
    enabled: !!address,
    staleTime: Infinity,
  });

export const useTransactions = (
  address: string,
  chain?: string,
  pageKey?: string,
) =>
  useQuery<TransactionsResponse>({
    queryKey: ["transactions", address, chain, pageKey],
    queryFn: () => api.getTransactions(address, chain, pageKey),
    enabled: !!address,
    staleTime: Infinity,
  });

export const useTokens = (address: string, chain?: string) =>
  useQuery<TokensResponse>({
    queryKey: ["tokens", address, chain],
    queryFn: () => api.getTokens(address, chain),
    enabled: !!address,
    staleTime: Infinity,
  });

export const usePrice = (chain: ChainKey) =>
  useQuery<number>({
    queryKey: ["price", chain],
    queryFn: () => api.getPrice(chain),
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
