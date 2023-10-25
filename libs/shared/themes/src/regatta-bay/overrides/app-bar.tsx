import { Components, Theme } from '@mui/material/styles';

export default function AppBar(theme: Theme): Components {
  return {
    MuiAppBar: {
      defaultProps: {},
      styleOverrides: {
        root: {
          background: theme.palette.appBar?.background || theme.palette.primary.main,
        },
      },
    },
  };
}
