import { useEffect, useState } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '@lths/features/mms/data-access';
import Routes from './routes';

import { LayoutToaster } from '@lths/shared/ui-elements';

import LayoutThemeProvider from './themes';

function App() {

  const mockingEnable = process.env.NX_PUBLIC_API_MOCKING_ENABLED === 'true';
  const [shouldRender, setShouldRender] = useState(!mockingEnable);
  useEffect(() => {
    async function prepareMocks() {
      const { worker } = await import('@lths/shared/mocks');
      await worker.start();
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
