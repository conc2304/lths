import { ReactNode, useMemo } from 'react';

import { CssBaseline, ThemeOptions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deDE as coreDeDE } from '@mui/material/locale';
import { deDE } from '@mui/x-date-pickers';

import getPalette from './palette';
import getTypography from './typography';
import getComponentOverrides from './overrides/index';


type Props = {
  children: ReactNode;
};

export function DashThemeProvider({ children }: Props) {
  const themePalette = getPalette();
  const themeTypography = getTypography(`'Public Sans', sans-serif`);

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1536,
        },
      },
      direction: 'ltr',
      mixins: {
        // layout header settings
        toolbar: {
          minHeight: 50,
          paddingTop: 4,
          paddingBottom: 4,
        },
      },
      palette: themePalette,
      typography: themeTypography,
      deDE, // x-date-pickers translations
      coreDeDE, // core translations
    }),
    [themePalette, themeTypography]
  );

  const theme = createTheme(themeOptions);
  theme.components = getComponentOverrides(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
