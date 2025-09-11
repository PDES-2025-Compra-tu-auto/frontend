import { useAuth } from "@/context/AuthContext/useAuth";
import type { FetchError, FetchServiceEndpoint } from "@/utils/fetch/types";
import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { useMemo } from "react";

export function useCtaQuery<T, P>(
  fetch: (params?: P) => FetchServiceEndpoint<T>,
  config?: UseQueryOptions<T, FetchError<T>>
): UseQueryResult<T, FetchError<T>> {
  const { getToken } = useAuth();

  const { keys, fetcher } = useMemo(() => {
    return fetch();
  }, [fetch]);

  return useQuery<T, FetchError<T>>({
    queryKey: keys,
    queryFn: async () => {
      const accessToken = await getToken();
      return fetcher({ accessToken });
    },
    ...config
  });
}
