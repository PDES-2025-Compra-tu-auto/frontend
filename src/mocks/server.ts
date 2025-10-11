import { setupServer } from 'msw/node';
import { authHandlers} from './handlers/auth-handlers';
import { userHandlers } from './handlers/user-handlers';
import { carHandlers } from './handlers/car-handlers';
import { reviewsHandler } from './handlers/reviews.handlers';
import { favouriteHandlers } from './handlers/favourite-handlers';

export const handlers= [...authHandlers,...userHandlers,...carHandlers,...reviewsHandler,...favouriteHandlers]
export const server = setupServer(...handlers);