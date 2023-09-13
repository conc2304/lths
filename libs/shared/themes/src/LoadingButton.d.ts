import '@mui/lab/LoadingButton';

declare module '@mui/lab/LoadingButton' {
  interface ButtonPropsColorOverrides {
    secondaryButton: true;
    primaryButton: true;
  }
}
