import { api } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useHealth = () =>
  useQuery({
    queryKey: ["health"],
    queryFn: () => api.getHealth(),
    staleTime: Infinity,
  });
