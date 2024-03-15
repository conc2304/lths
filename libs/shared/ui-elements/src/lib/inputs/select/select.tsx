import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from '@mui/material';
import { ColorThemeMui } from 'libs/shared/ui-elements/src/lib/types';

type TValue = string | number;
type SelectLTHSProps = SelectProps & {
  helperText: string;
  color?: ColorThemeMui;
  options: Array<TValue | { label: string | number; value: TValue }>;
  noOptionsAvailableText?: string;
  size?: 'small' | 'medium';
};

export const SelectLTHS = (props: SelectLTHSProps) => {
  const {
    color = 'primary',
    error,
    helperText,
    label,
    name,
    onBlur,
    onChange,
    options,
    placeholder,
    required,
    value,
    noOptionsAvailableText,
    size = 'small',
  } = props;

  // {/* parsing and stringifying in order to keep id label structure */}

  const labelId = `Select-label--${name || Math.random()}`;

  return (
    <FormControl fullWidth sx={{ my: 2 }} size={size}>
      {label && (
        <InputLabel id={labelId} color={error ? 'error' : color}>
          {label}
        </InputLabel>
      )}
      <Select
        name={name}
        value={value}
        required={required}
        label={label}
        labelId={labelId}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        size={size}
        // renderValue={(selected) => {
        //   console.log({ selected });
        //   if (!selected) return 'banana';
        //   const sVal = JSON.parse(selected) as EventType;
        //   // if (sVal.id === eventTypeFallback.id) {
        //   //   return (
        //   //     <Box component="span" sx={{ color: (theme) => theme.palette.grey[500] }}>
        //   //       {eventTypeFallback.label}
        //   //     </Box>
        //   //   );
        //   // }
        //   if (sVal.id === eventTypeUnknown.id) {
        //     return <Box component="span">{eventTypeUnknown.label}</Box>;
        //   }
        //   return sVal.label;
        // }}
      >
        <MenuItem disabled value={undefined}>
          <em>{!options?.length ? noOptionsAvailableText || 'No options available' : placeholder || label}</em>
        </MenuItem>

        {options.map((option) => {
          const { value, label } = typeof option === 'object' ? option : { value: option, label: option };
          return (
            <MenuItem key={label} value={JSON.stringify({ value, label })}>
              {label}
            </MenuItem>
          );
        })}
      </Select>

      {helperText && (
        <FormHelperText error sx={{ ml: 2 }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};
