import { ReactNode } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

type Props = {
  children: ReactNode;
};

export function RBThemeProvider({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
