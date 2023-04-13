import { Components, Theme } from '@mui/material/styles';

export default function Typography(theme: Theme): Components {
  return {
    MuiTypography: {
      defaultProps: {
        letterSpacing: theme.spacing(0.01875),
      },

    },
  };
}
