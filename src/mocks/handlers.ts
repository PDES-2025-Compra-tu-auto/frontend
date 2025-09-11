import { http, HttpResponse } from 'msw';
import { loginResponseJson, registerResponse } from './data/auth';

export const BACKEND_API = import.meta.env.FE_BACKEND_API

const loginHandler = http.post(`${BACKEND_API}/auth/login`,async({request}) => {
  const {password} = await request.clone().json()
  if(password !== 'password'){
    return new HttpResponse({message: 'Invalid credentials'}, {status:  401 });
  }
  return HttpResponse.json(loginResponseJson)

});

const registerHandler =  http.post(`${BACKEND_API}/auth/register`,async({request}) => {
  const {role,email} = await request.clone().json()
  return HttpResponse.json(registerResponse({role,email}))

}); 
const validateHandler =  http.post(`${BACKEND_API}/auth/validate`,async() => {
  return new HttpResponse({valid:true}, {status:  200 });

});
export const handlers = [loginHandler,registerHandler,validateHandler];