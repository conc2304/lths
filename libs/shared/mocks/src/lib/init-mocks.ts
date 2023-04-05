import { HOST } from '@lths/shared/data-access';

export async function initMocks() {
  if (typeof window !== 'undefined') {
    const { worker } = await import('./browser');
    worker.start({
      onUnhandledRequest(req, print) {
        const { host } = req.url;
        const ingorePath = host !== HOST.domainName;
        if (ingorePath) {
          // don't log warnings for paths that we are not actively mocking
          return;
        }

        print.warning();
      },
    });
  }
}
