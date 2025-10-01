import { http, HttpResponse } from "msw";
import { matchRoleToken } from "../utils";
import { me, profile } from "../data/user";

export const BACKEND_API = import.meta.env.FE_BACKEND_API;

const meHandler = http.get(
  `${BACKEND_API}/users/me`,
  async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    return HttpResponse.json(me(matchRoleToken(authHeader||'')||''));
  }
);

const profileHandler = http.get(
  `${BACKEND_API}/users/profile`,
  async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    const role = matchRoleToken(authHeader||'')
    return HttpResponse.json(profile(role||"BUYER"),{status:200});
  }
);

export const userHandlers = [profileHandler,meHandler];
