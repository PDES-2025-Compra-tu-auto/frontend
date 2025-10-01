import { setupServer } from 'msw/node';
import { authHandlers} from './handlers/auth-handlers';
import { userHandlers } from './handlers/user-handlers';

export const handlers= [...authHandlers,...userHandlers]
export const server = setupServer(...handlers);