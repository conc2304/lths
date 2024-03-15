import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles';

export default function TextField(theme: Theme): Components {
  return {
    MuiTextField: {
      defaultProps: {
        size: 'small',
        variant: 'outlined',
      },
      styleOverrides: {},
    },
  };
}
