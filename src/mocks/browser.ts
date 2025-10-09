import { setupWorker } from 'msw/browser'
import { authHandlers} from './handlers/auth-handlers';
import { userHandlers } from './handlers/user-handlers';
import { carHandlers } from './handlers/car-handlers';
import { reviewsHandler } from './handlers/reviews.handlers';
import { favouriteHandlers } from './handlers/favourite-handlers';

export const handlers= [...authHandlers,...userHandlers,...carHandlers,...reviewsHandler,...favouriteHandlers]
export const worker = setupWorker(...handlers);

export const startMockServiceWorker = () => {
    worker.start();
}

export const stopMockServiceWorker = () => {
    worker.stop();
}