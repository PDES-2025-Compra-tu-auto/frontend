/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { http, HttpResponse } from "msw";
import { loginResponseJson, registerResponse } from "../data/auth";
import { matchRoleToken, roleByUser } from "../utils";

export const BACKEND_API = import.meta.env.FE_BACKEND_API;
const loginHandler = http.post(
  `${BACKEND_API}/auth/login`,
  async ({ request }) => {
    const { password,email } = await request.clone().json();
    if (password !== "password") {
      return new HttpResponse(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
    return HttpResponse.json(loginResponseJson(roleByUser(email)));
  }
);

const registerHandler = http.post(
  `${BACKEND_API}/auth/register`,
  async ({ request }) => {
    console.log(request)
    const { role, email } = await request.clone().json();
    return HttpResponse.json(registerResponse({ role, email }));
  }
);
const validateHandler = http.post(`${BACKEND_API}/auth/validate`, async ({request}) => {
      const authHeader = request.headers.get('Authorization');

  const role =matchRoleToken(authHeader||'')
  return HttpResponse.json({
    valid: true,
    role: role,
    fullname: `Diego ${role.toLowerCase()}`,
    email: `${role}@gmail.com`,
    id: "9e7669fe-74db-4ae4-ab71-563e47373a46",
  });
});
export const authHandlers = [loginHandler, registerHandler, validateHandler];
