import { blue } from '@mui/material/colors';
import { Components, Theme } from '@mui/material/styles';

export default function Link(theme: Theme): Components {
  return {
    MuiLink: {
      defaultProps: {
        letterSpacing: theme.spacing(0.01875),
        color: blue[500] // "#0091FF",
      },

    },
  };
}
