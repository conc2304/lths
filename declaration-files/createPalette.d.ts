import '@mui/material/styles/createPalette';
import { Property } from 'csstype';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    // additionalButtonColorPlaceholder: PaletteColor;
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
    // additionalButtonColorPlaceholder: PaletteColorOptions;
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
