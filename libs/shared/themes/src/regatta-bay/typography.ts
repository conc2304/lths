import { TypographyOptions } from '@mui/material/styles/createTypography';

const TypographyTheme = (fontFamily: string): TypographyOptions => {
  return {
    htmlFontSize: 16,
    fontFamily,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontWeight: 600,
      fontSize: '2.375rem',
      lineHeight: 1.21,
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.27,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.33,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.39,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.46,
    },
    h6: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.52,
    },
    overline: {
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: '2rem',
      letterSpacing: '1px',
    },
    subtitle2: {
      // fontWeight: 500, // this is that it should be but not getting the expected results
      fontWeight: 'bold',
      fontSize: '0.875rem',
      lineHeight: '1.375rem',
      letterSpacing: '0.1px',
    },
    button: {
      textTransform: 'uppercase',
    },
  };
};

export default TypographyTheme;
