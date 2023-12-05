import { createTheme, Theme, ThemeOptions } from '@mui/material';
import { enUS as coreEnUs } from '@mui/material/locale'; // core translations
import { enUS } from '@mui/x-date-pickers'; // translations for date picker
import type {} from '@mui/x-date-pickers/themeAugmentation';

import getComponentOverrides from './overrides/index';
import getPalette from './palette';
import { shadows } from './shadows';
import getTypography from './typography';

import '../fonts/index.css';

const palette = getPalette();
const typography = getTypography(`'Roboto', sans-serif`);

const baseThemeOptions: ThemeOptions = {
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
      height: '3.5rem',
      minHeight: 50,
      paddingTop: 4,
      paddingBottom: 4,
    },
  },
  palette,
  typography,
  shape: {
    borderRadius: 4,
  },
  shadows,
};

const theme = createTheme(baseThemeOptions, enUS, coreEnUs);
export const RBTheme: Theme = { ...theme, components: { ...theme.components, ...getComponentOverrides(theme) } };
