import { Components } from '@mui/material/styles';

export default function TextField(): Components {
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
