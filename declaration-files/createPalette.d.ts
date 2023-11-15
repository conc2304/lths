import '@mui/material/styles/createPalette';
import { Property } from 'csstype';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    secondaryButton: PaletteColor;
    primaryButton: PaletteColor;
    appBar?: {
      background?: Property.BackgroundColor;
    };
    snackBar?: PaletteColor;
    sideBar?: {
      background?: Property.BackgroundColor;
      iconColor?: Property.Color;
    };
  }
  interface PaletteOptions {
    secondaryButton: PaletteColorOptions;
    primaryButton: PaletteColorOptions;
    appBar?: {
      background?: Property.BackgroundColor;
    };
    snackBar?: PaletteColorOptions;
    sideBar?: {
      background?: Property.BackgroundColor;
      iconColor?: Property.Color;
    };
  }
}
