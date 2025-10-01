import { setupWorker } from 'msw/browser'
import { authHandlers} from './handlers/auth-handlers';
import { userHandlers } from './handlers/user-handlers';

export const handlers= [...authHandlers,...userHandlers]
export const worker = setupWorker(...handlers);

export const startMockServiceWorker = () => {
    worker.start();
}

export const stopMockServiceWorker = () => {
    worker.stop();
}