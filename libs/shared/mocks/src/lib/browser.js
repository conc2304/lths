import { setupWorker } from 'msw';

import notifications from './services/notifications';
import user from './user-service';

export const worker = setupWorker(...user, ...notifications);
