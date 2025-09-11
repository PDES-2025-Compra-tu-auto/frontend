import {type FetchServiceParams } from "./httpService";

export type FetchServiceEndpointParams = Omit<FetchServiceParams,'url'>

export interface FetchServiceEndpoint<T>{
    keys: Array<unknown>
    fetcher: (params: FetchServiceEndpointParams) => Promise<T>
}

export interface FetchError<T> {
    data: T 
    status: boolean 
    statusText:string
    url:string 
    headers: {[x:string]:string}
}

export interface PaginatedResponse<T> {
    items: Array<T>
    page:number 
    totalPages:number
    totalItems:number 
}

export interface PaginationParameters<T>{
    page:number 
    pageSize?:number 
    order?: 'asc' | 'desc'
    orderBy?: keyof T
}