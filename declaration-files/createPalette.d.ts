import '@mui/material/styles/createPalette';
import { Property } from 'csstype';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    secondaryButton: PaletteColor;
    primaryButton: PaletteColor;
    appBar?: {
      background?: Property.BackgroundColor;
    };
    sideBar?: {
      width?: Property.Width<TLength>;
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
    sideBar?: {
      background?: Property.BackgroundColor;
      width?: Property.Width<TLength>;
      iconColor?: Property.Color;
    };
  }
}
