import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { RBTheme } from '@lths-mui/shared/themes';
import { render, within } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';

import { LayoutProvider } from '@lths/shared/ui-layouts';
import { WebEnvName } from '@lths/shared/utils';

import { PrivateLayout } from './private'; //

describe('PrivateLayout', () => {
  const renderWithWrappers = () =>
    render(
      <HashRouter>
        <LayoutProvider>
          <ThemeProvider theme={RBTheme}>{PrivateLayout}</ThemeProvider>
        </LayoutProvider>
      </HashRouter>
    );

  it('renders without crashing', () => {
    const { getByTestId, getByText } = renderWithWrappers();
    expect(getByTestId('Toolbar-HeaderLeft--root')).toBeInTheDocument();
    expect(getByTestId('Toolbar-UserActionMenu--root')).toBeInTheDocument();
    expect(getByTestId('Dashboard-layout--root')).toBeInTheDocument();
    expect(getByText('MMS 1.0')).toBeInTheDocument();
  });

  it('renders logo icon and text', () => {
    const { getByTestId } = renderWithWrappers();
    expect(getByTestId('LitehouseLogoIcon')).toBeInTheDocument();
    expect(getByTestId('LitehouseLogoText')).toBeInTheDocument();
  });

  //
  // Env Indicator Tests
  //

  describe('environment indicator', () => {
    // The first item in the tuple is the env variable passed down from the ci pipeline
    jest.mock('../../../../../.env', () => { "" }, {virtual: true})
    const envs: [WebEnvName, string][] = [
      ['dev', 'development'],
      ['local', 'local'],
      ['qa', 'qa'],
      ['staging', 'staging'],
      ['production', 'production'],
    ];
    // add a bad path to make sure it handles correctly

    for (const WebEnv of envs) {
      const [processEnv, label] = WebEnv;
      it(`renders correct environment indicator for ${processEnv || 'null'} environment.`, () => {
        jest.isolateModules(() => {
          require('../../../../../.env');
          process.env.NX_PUBLIC_WEB_ENV = processEnv;
        });

        const { queryByTestId, queryByText } = renderWithWrappers();

        if (processEnv === 'production') {
          expect(queryByTestId('Appbar--env-indicator')).not.toBeInTheDocument();
          expect(queryByText(label)).not.toBeInTheDocument();
        } else {
          expect(queryByTestId('Appbar--env-indicator')).toBeInTheDocument();
          expect(within(queryByTestId('Appbar--env-indicator')).getByText(label)).toBeInTheDocument();
        }
      });
    }
  });
});
