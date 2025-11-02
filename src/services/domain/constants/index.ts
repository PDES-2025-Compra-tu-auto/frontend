declare global {
  interface Window {
	__ENV__?: {
	  FE_BACKEND_API?: string;
	  [key: string]: string|undefined;
	};
  }
}

export const BACKEND_API = window?.__ENV__?.FE_BACKEND_API ?? import.meta.env.FE_BACKEND_API 