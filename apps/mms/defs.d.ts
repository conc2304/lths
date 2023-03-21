import { ComponentsOverrides, ComponentsProps, Theme } from "@mui/material/styles";
import { DatePickerProps } from "@mui/x-date-pickers";

declare module '@mui/material/styles' {
  interface Components {
    MuiDatePicker?: {
      defaultProps?: DatePickerProps<unknown>;
      styleOverrides?: ComponentsOverrides<Theme>;
    }
  }
    
}