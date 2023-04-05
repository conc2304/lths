import { setupWorker } from 'msw';

import user  from './user-service';

export const worker = setupWorker(...user);