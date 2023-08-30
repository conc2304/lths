import { CalendarMonthOutlined } from '@mui/icons-material';
import { Components, Theme } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';

export default function DatePicker(theme: Theme): Components {
  return {
    MuiDatePicker: {
      defaultProps: {
        slots: {
          openPickerIcon: CalendarMonthOutlined,
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
