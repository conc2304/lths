import { ReactNode } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RBTheme } from './theme';

type Props = {
  children: ReactNode;
};

export function RBThemeProvider({ children }: Props) {
  return (
    <ThemeProvider theme={RBTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
