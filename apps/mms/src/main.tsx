import { StrictMode } from 'react';
import '@fontsource/roboto';
import * as ReactDOM from 'react-dom/client';

import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
