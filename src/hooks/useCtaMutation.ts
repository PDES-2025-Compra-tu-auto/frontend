import { useAuth } from "@/context/AuthContext/useAuth";
import type { FetchError, FetchServiceEndpoint } from "@/utils/fetch/types";
import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import { useMemo } from "react";

export function useCraMutation<T, P>(
  fetch: (params?: P) => FetchServiceEndpoint<T>,
  config?: UseMutationOptions<T, FetchError<T>, P>
): UseMutationResult<T, FetchError<T>, P> {
  const { getToken } = useAuth();
  const { fetcher } = useMemo(fetch, [fetch]);

  return useMutation<T, FetchError<T>, P>({
    mutationFn: async (params: P) => {
      const accessToken = await getToken();
      return fetcher({ ...params, accessToken });
    },
    ...config,
  });
}
