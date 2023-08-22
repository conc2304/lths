import React from 'react';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { PopperArrow } from './arrow';

describe('PopperArrow component', () => {
  const theme = createTheme();

  it('renders with the specified placement and size', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <PopperArrow placement="top" size="2rem" data-testid="popper-arrow" />
      </ThemeProvider>
    );

    const element = getByTestId('popper-arrow');
    const styles = window.getComputedStyle(element);

    expect(styles.width).toBe('2.8284271247461903rem');
    expect(styles.height).toBe('2rem');
    expect(styles.bottom).toBe('0px');
    expect(styles.marginBottom).toBe('-2rem');
  });

  it('renders with default size when no size is specified', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <PopperArrow placement="top" data-testid="popper-arrow" />
      </ThemeProvider>
    );

    const element = getByTestId('popper-arrow');
    const styles = window.getComputedStyle(element);

    expect(styles.height).toBe('1rem');
    expect(styles.width).toBe('1.4142135623730951rem');
  });
});
