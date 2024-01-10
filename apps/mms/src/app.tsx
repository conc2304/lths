import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FlagsProvider } from 'react-feature-flags';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '@lths/features/mms/data-access';
import { LayoutToaster } from '@lths/shared/ui-elements';
import { LayoutProvider } from '@lths/shared/ui-layouts';

import { MMS_FEATURE_FLAGS } from './feature-flags';
import Routes from './routes';
import { RBThemeProvider as LayoutThemeProvider } from './themes';

function App() {
  const mockingEnable = process.env.NX_PUBLIC_API_MOCKING === 'enabled';
  const githashVersion = process.env.NX_PUBLIC_UI_VERSION || 'N/A - Development';
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
      <PersistGate loading={null} persistor={persistor}>
        <FlagsProvider value={MMS_FEATURE_FLAGS}>
          <LayoutThemeProvider>
            <LayoutProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Helmet>
                  <meta name="UI Version" content={githashVersion} />
                </Helmet>
                <Routes />
              </LocalizationProvider>
            </LayoutProvider>
            <LayoutToaster />
          </LayoutThemeProvider>
        </FlagsProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
