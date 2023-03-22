import { Components, Theme } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';

export default function DatePicker(theme: Theme): Components {
  return {
    MuiDatePicker: {
      styleOverrides: {
        '& .MuiFormControl-root': {
          backgroundColor: 'red',
          margin: '20px',
        },
      },
      defaultProps: {
        slotProps: {
          textField: {
            color: 'primary',
            variant: 'outlined',
            size: 'small',
            margin: 'dense',
            sx: {
              '&.MuiTextField-root': {
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
                width: '150px'
              },
              '& .MuiFormLabel-root': {
                textTransform: 'uppercase',
              },
              '& .MuiInputLabel-root': {
                textTransform: 'uppercase',
                fontSize: '0.688rem'
              },
              '& .MuiInputBase-root': {
                color: '#6D7278',
                fontSize: '0.688rem'
              },
            },
          },
        },
      },
    },
  };
}
