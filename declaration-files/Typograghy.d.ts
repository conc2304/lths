import '@mui/material/styles';
import '@mui/material/Typography';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    input: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    input?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    input: true;
  }
}
