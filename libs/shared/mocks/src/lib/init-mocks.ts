import { HOST } from '@lths/shared/data-access';

export async function initMocks() {
  if (typeof window !== 'undefined') {
    const { worker } = await import('./browser');
    worker.start({
      onUnhandledRequest(req, print) {
        const { host, pathname } = req.url;
        const ingorePath = pathname.startsWith(HOST.apiPath) || host !== HOST.domainName;
        if (ingorePath) {
          // don't log warnings for paths that we are not actively mocking
          return;
        }

        print.warning();
      },
    });
  }
}
