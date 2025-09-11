import { useAuth } from "@/context/AuthContext/useAuth";
import type { FetchError, FetchServiceEndpoint, PaginatedResponse } from "@/utils/fetch/types";
import { useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useMemo } from "react";


export function useCtaInfiniteQuery<T,P>(
    fetch: (params?:P) => FetchServiceEndpoint<PaginatedResponse<T>>,
    config: UseInfiniteQueryOptions<PaginatedResponse<T>,FetchError<PaginatedResponse<T>>>
){
 const {getToken} = useAuth()
const {keys,fetcher} = useMemo(fetch,[fetch])
return useInfiniteQuery({
    ...config,
    queryKey:keys ,
    getNextPageParam:(paginatedResponse)=>(paginatedResponse.totalPages> paginatedResponse.page?paginatedResponse.page + 1 :undefined),
    queryFn:async()=>{
    const accessToken = await getToken()
    return fetcher({accessToken})
    },
}
)}