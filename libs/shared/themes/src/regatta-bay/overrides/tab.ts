import { Components, Theme } from '@mui/material/styles';

export default function Tab(theme: Theme): Components {
  return {
    MuiTab: {
      defaultProps: {
      },
      styleOverrides: {
        root: {
            '&.Mui-selected': { color: "#3D4752" },
            letterSpacing: theme.spacing(0.005),
        },
      },
    },
  };
}