import { Components, Theme } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';

export default function DatePicker(theme: Theme): Components {
  return {
    MuiDatePicker: {
      styleOverrides: {
        '& .MuiFormControl-root': {
          backgroundColor: 'red',
          margin: theme.spacing(2),
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
                width: '9.375rem',
                ml: 0,
              },
              '& .MuiFormLabel-root': {
                textTransform: 'uppercase',
              },
              '& .MuiInputLabel-root': {
                textTransform: 'uppercase',
                fontSize: '0.688rem'
              },
              '& .MuiInputBase-root': {
                color: theme.palette.grey[600],
                fontSize: '0.688rem'
              },
            },
          },
        },
      },
    },
  };
}
