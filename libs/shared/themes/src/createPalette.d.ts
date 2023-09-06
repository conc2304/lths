import '@mui/material/styles/createPalette';
import { PaletteColor, PaletteColorOptions } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    secondaryButton: PaletteColor;
    primaryButton: PaletteColor;
  }
  interface PaletteOptions {
    secondaryButton: PaletteColorOptions;
    primaryButton: PaletteColorOptions;
  }
}
