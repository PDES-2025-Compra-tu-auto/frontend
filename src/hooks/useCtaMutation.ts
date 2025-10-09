import { useAuth } from "@/context/AuthContext/useAuth";
import type { FetchError, FetchServiceEndpoint } from "@/utils/fetch/types";
import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";

export function useCtaMutation<T, P>(
  fetch: (params?: P) => FetchServiceEndpoint<T>,
  config?: UseMutationOptions<T, FetchError<T>, P>
): UseMutationResult<T, FetchError<T>, P> {
  const { getToken } = useAuth();

  return useMutation<T, FetchError<T>, P>({
    mutationFn: async (params: P) => {
      const accessToken = await getToken();

      const { fetcher } = fetch(params);
      return fetcher({ ...params, accessToken });
    },
    ...config,
  });
}
