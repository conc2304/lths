import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles';

export default function Table(theme: Theme): Components {
  return {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1.5),
        },
      },
    },
  };
}
