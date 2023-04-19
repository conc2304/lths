import { useEffect, useState } from 'react';
import { store } from '@lths/features/mms/data-access';
import { LayoutToaster } from '@lths/shared/ui-elements';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

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
        </LayoutThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
