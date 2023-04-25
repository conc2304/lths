import { ButtonPropsColorOverrides as MuiButtonPropsColorOverrides } from '@mui/material/button';
import { PaletteOptions as MuiPaletteOptions, Palette as MuiPalette } from '@mui/material/styles';

// 2. Notify TypeScript about the new color in the palette
declare module '@mui/material/styles' {
  interface Palette extends MuiPalette {
    alt_button: Palette['primary'];
  }
  interface PaletteOptions extends MuiPaletteOptions {
    alt_button: PaletteOptions['primary'];
  }
}

// 3. Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides extends MuiButtonPropsColorOverrides {
    alt_button: true;
  }
}
