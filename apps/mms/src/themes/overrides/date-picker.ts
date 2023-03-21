import { Components, Theme } from '@mui/material/styles';

export default function DatePicker(theme: Theme): Components {
  return {
    MuiDatePicker: {
      styleOverrides: {
        root: {
          '& .MuiFormLabel-root' : {
            textTransform: 'uppercase',
            color: 'red'
          }
        },
      },
    },
  } as Components;
}
