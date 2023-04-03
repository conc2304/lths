import { setupWorker } from 'msw';

import notifications from './service/notifications-service';
import user from './user-service';

export const worker = setupWorker(...user, ...notifications);
