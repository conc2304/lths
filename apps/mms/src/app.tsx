import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '@lths/features/mms/data-access';
import { HOST } from '@lths/shared/data-access';
import { LayoutToaster } from '@lths/shared/ui-elements';

import Routes from './routes';
import { RBThemeProvider as LayoutThemeProvider } from './themes';

function App() {
  const mockingEnable = process.env.NX_PUBLIC_API_MOCKING === 'enabled';
  const [shouldRender, setShouldRender] = useState(!mockingEnable);
  useEffect(() => {
    async function prepareMocks() {
      const { initMocks } = await import('@lths/shared/mocks');
      await initMocks();
      setShouldRender(true);
    }
    if (mockingEnable) {
      prepareMocks();
    }
  }, [mockingEnable]);

  if (!shouldRender) {
    return null;
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <LayoutThemeProvider>
          <Routes />
          <LayoutToaster />
          <Helmet>
            {!document.location.host.includes('localhost') && (
              <meta
                http-equiv="Content-Security-Policy"
                content={`default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' ; font-src 'self'; connect-src 'mok-dev.briteliteimmersive.io' 'self'; media-src 'self';`}
              />
            )}
          </Helmet>
        </LayoutThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
