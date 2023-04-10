import { PaletteMode, PaletteOptions } from '@mui/material';

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
      contrastText: '#1677ff ',
    },
    info: {
      main: '#E3F3FF', // light, dark, and contrastText, auto generated by with tonalOffset and contrastThreshold
    },
  };
};

export default getPalette;
