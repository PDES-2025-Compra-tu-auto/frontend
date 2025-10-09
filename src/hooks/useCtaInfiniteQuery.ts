import { useAuth } from "@/context/AuthContext/useAuth";
import type {
  FetchError,
  FetchServiceEndpoint,
  PaginatedCursorResponse,
  PaginatedResponse,
} from "@/utils/fetch/types";
import {
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { useMemo } from "react";

type PaginationMode = 'page' | 'cursor';


type PaginatedCtaResponse<T> = PaginatedResponse<T> | PaginatedCursorResponse<T>;

interface UseCtaInfiniteQueryConfig<T> extends UseInfiniteQueryOptions<PaginatedCtaResponse<T>, FetchError<PaginatedResponse<T>>> {
  mode?: PaginationMode;
}

export function useCtaInfiniteQuery<T, P extends { page?: number; cursor?: string; accessToken?: string }>(
  fetch: (params?: P) => FetchServiceEndpoint<PaginatedCtaResponse<T>>,
  config?: UseCtaInfiniteQueryConfig<T>
) {
  const { getToken } = useAuth();
  const mode = config?.mode ?? 'page'; // modo por defecto: paginación por página

  const { keys, fetcher } = useMemo(() => fetch(), [fetch]);

  return useInfiniteQuery({
    ...config,
    initialPageParam: mode === 'page' ? 1 : undefined,
    queryKey: keys,
    getNextPageParam: (lastPage: PaginatedCtaResponse<T>) => {
      if (mode === 'page') {
        const pageData = lastPage as PaginatedResponse<T>;
        return pageData.totalPages > pageData.page ? pageData.page + 1 : undefined;
      } else {
        const cursorData = lastPage as PaginatedCursorResponse<T>;
        return cursorData.hasMore ? cursorData.nextCursor : undefined;
      }
    },
    queryFn: async ({ pageParam }) => {
      const accessToken = await getToken();

      if (mode === 'page') {
        return fetcher({ accessToken, page: pageParam } as P);
      } else {
        return fetcher({ accessToken, cursor: pageParam } as P);
      }
    },
  });
}
