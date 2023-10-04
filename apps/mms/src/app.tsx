import { useEffect, useState } from 'react';
import { FlagsProvider } from 'react-feature-flags';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { store } from '@lths/features/mms/data-access';
import { LayoutToaster } from '@lths/shared/ui-elements';

import { MMS_FEATURE_FLAGS } from './feature-flags';
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
      <FlagsProvider value={MMS_FEATURE_FLAGS}>
        <HashRouter>
          <LayoutThemeProvider>
            <Routes />
            <LayoutToaster />
          </LayoutThemeProvider>
        </HashRouter>
      </FlagsProvider>
    </Provider>
  );
}

export default App;
