import { Components, Theme } from '@mui/material/styles';

export default function Paper(theme: Theme): Components {
  return {
    MuiPaper: {
      defaultProps: {
      },
      styleOverrides: {
        root: {
          borderRadius: theme.spacing(1), 
          boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.15)',
        }
      },
    },
  };
}