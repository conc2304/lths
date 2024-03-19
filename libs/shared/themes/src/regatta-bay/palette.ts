import { PaletteMode } from '@mui/material';
import { PaletteOptions } from '@mui/material/styles';

const getPalette = (mode: PaletteMode = 'light'): PaletteOptions => {
  return {
    mode,
    contrastThreshold: 4,
    tonalOffset: 0.5,
    primary: {
      main: '#007882',
      dark: '#006068',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#46494C',
      dark: '#17181A',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#D32F2F',
      dark: '#C62828',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#ED6C02',
      dark: '#E65100',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#0288D1',
      dark: '#01579B',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#2E7D32',
      dark: '#1B5E20',
      contrastText: '#FFFFFF',
    },
    appBar: {
      background: '#110922',
      // background: appBarColor,
    },
    sideBar: {
      background: '#f4f4f4',
    },
    action: {
      activatedOpacity: 0.12,
      active: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(0, 0, 0, 0.12)',
      focusOpacity: 0.12,
      hover: 'rgba(0, 0, 0, 0.04)',
      hoverOpacity: 0.04,
      selected: 'rgba(0, 0, 0, 0.08)',
      selectedOpacity: 0.08,
    },
  };
};

export default getPalette;
