import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor, ConnectedFlagsProvider } from '@lths/features/mms/data-access';
import { LayoutToaster } from '@lths/shared/ui-elements';
import { LayoutProvider } from '@lths/shared/ui-layouts';
import { getAppEnvTitle, getAppEnvironmentName } from '@lths/shared/utils';

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

  const env = getAppEnvironmentName(process.env.NX_PUBLIC_WEB_ENV);
  const envTitle = getAppEnvTitle({ envName: env });

  return (
    <>
      <Helmet>
        <title>{envTitle}</title>
      </Helmet>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedFlagsProvider>
            <LayoutThemeProvider>
              <LayoutProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Routes />
                </LocalizationProvider>
              </LayoutProvider>
              <LayoutToaster />
            </LayoutThemeProvider>
          </ConnectedFlagsProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
