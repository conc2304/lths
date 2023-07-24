import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Components, Theme } from '@mui/material/styles';

export default function TimePicker(theme: Theme): Components {
  return {
    MuiTimePicker: {
      styleOverrides: {},
      defaultProps: {
        slots: {
          openPickerIcon: AccessTimeIcon,
        },
        slotProps: {
          textField: {
            color: 'primary',
            variant: 'outlined',
            size: 'small',
            margin: 'dense',
            sx: {
              '&.MuiTextField-root': {
                marginRight: theme.spacing(1.25),
                width: '9.375rem',
                ml: 0,
              },
              '& .MuiInputBase-inputSizeSmall': {
                boxSizing: 'border-box',
                height: '2.188rem',
              },
              '& .MuiFormLabel-root': {
                textTransform: 'uppercase',
              },
              '& .MuiInputLabel-root': {
                textTransform: 'uppercase',
                fontSize: '0.688rem',
              },
              '& .MuiInputBase-root': {
                color: theme.palette.grey[900],
                fontSize: '0.688rem',
              },
            },
          },
        },
      },
    },
  };
}
