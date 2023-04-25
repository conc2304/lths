import '@mui/material/styles/createPalette';
import { PaletteColor, PaletteColorOptions } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    alt_button: PaletteColor;
  }
  interface PaletteOptions {
    alt_button: PaletteColorOptions;
  }
}
