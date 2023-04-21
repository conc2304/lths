import { isRelativePath } from './services/api';

export async function initMocks() {
  if (typeof window !== 'undefined') {
    const { worker } = await import('./browser');
    worker.start({
      onUnhandledRequest(req, print) {
        const ingorePath = isRelativePath(req.url);
        if (ingorePath) {
          // don't log warnings for paths that we are not actively mocking
          return;
        }

        print.warning();
      },
    });
  }
}
