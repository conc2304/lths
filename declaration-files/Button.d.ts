import '@mui/material/Button';

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    secondaryButton: true;
    primaryButton: true;
  }
}
