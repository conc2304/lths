import { Components } from '@mui/material/styles';

export default function Fab(): Components {
  return {
    MuiFab: {
      styleOverrides: {
        root: {
          backgroundColor: '#007882',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#006169',
          },
        },
      },
    },
  };
}
