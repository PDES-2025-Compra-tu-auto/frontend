export interface FetchServiceParams { 
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  accessToken?: string;
  withCredentials?: boolean;
  headers?: HeadersInit;
  params?: { [x: string]: Array<number> | string | boolean | number };
  data?: unknown | FormData;
}

export async function fetchCore({
  url,
  method = "GET",
  withCredentials = true,
  headers,
  params,
  data,
  accessToken,
}: FetchServiceParams) {
  const config: RequestInit = {
    method,
    credentials: withCredentials ? 'include' : 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
  };
  if (data) {
    const isFormData = data instanceof FormData;
    if (isFormData) {
      config.body = data;
      delete (config.headers as Record<string, string>)['Content-Type'];
    } else {
      config.body = JSON.stringify(data);
    }
  }
  let urlWithParams = url;
  if (params && Object.keys(params).length > 0) {
    const urlParams = Object.entries(params)
      .map(([key, value]) => {
        const generatePropertyQueryString = (k: string, v: string) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`;
        if (Array.isArray(value)) {
          return value.map((item) => generatePropertyQueryString(key, String(item))).join('&');
        }
        return generatePropertyQueryString(key, String(value));
      })
      .join('&');
    urlWithParams = `${url}?${urlParams}`;
  }

  return fetch(urlWithParams, config);
}

function buildPromiseRejection(response:Response, responseData: unknown){
    const promiseRejection = {
        data: responseData,
        url: response.url,
        status: response.status,
        statusText: response.statusText,
        redirected: response.redirected
    }
    return Promise.reject(promiseRejection)
}


export async function fetchJson<T>(params:FetchServiceParams): Promise<T>{
    return fetchCore(params).then((response: Response) => {
        if(response.ok){
            return response.json()
        }
        return response.json().then((responseJson)=>buildPromiseRejection(response,responseJson))
    })
}


export async function fetchBlob(params:FetchServiceParams){
      return fetchCore(params).then((response: Response) => {
        if(response.ok){
            return response.blob()
        }
        return response.json().then((responseJson)=>buildPromiseRejection(response,responseJson))
    })
}