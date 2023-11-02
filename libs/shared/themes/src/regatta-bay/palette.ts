import { PaletteMode } from '@mui/material';
import { PaletteOptions } from '@mui/material/styles';

const getPalette = (mode: PaletteMode = 'light'): PaletteOptions => {
  return {
    mode,
    contrastThreshold: 4,
    tonalOffset: 0.5,
    primary: {
      main: '#3D4752',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#e6f4ff',
      contrastText: '#1677ff',
    },
    info: {
      main: '#E3F3FF', // light, dark, and contrastText, auto generated by with tonalOffset and contrastThreshold
    },
    primaryButton: {
      light: '#33939B',
      main: '#007882',
      dark: '#00545B',
      contrastText: '#FFFFFF',
    },
    secondaryButton: {
      light: '#4DB2FF',
      main: '#0091FF',
      dark: '#0066B3',
      contrastText: '#0091FF',
    },
    appBar: {
      background: '#110922',
    },
    sideBar: {
      background: '#f4f4f4',
    },
  };
};

export default getPalette;
