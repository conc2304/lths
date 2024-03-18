import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from '@mui/material';
import { ColorThemeMui } from 'libs/shared/ui-elements/src/lib/types';

type TValue = string | number;
type SelectLTHSProps = SelectProps & {
  helperText: string;
  color?: ColorThemeMui;
  options: Array<TValue | { label: string | number; value: TValue }>;
  noOptionsAvailableText?: string;
  size?: 'small' | 'medium';
  value: TValue | null;
};

export const SelectLTHS = (props: SelectLTHSProps) => {
  const {
    color = 'primary',
    error,
    helperText,
    label,
    name,
    noOptionsAvailableText,
    onBlur,
    onChange,
    options,
    placeholder,
    renderValue: renderValueProp,
    required,
    size = 'small',
    value,
  } = props;

  // TODO - handle error states and error messages
  const labelId = `Select-label--${name || Math.random()}`;

  const optionsAreObjects = typeof options?.[0] === 'object';

  const renderValue =
    renderValueProp ||
    ((selected) => {
      //  parsing and stringifying in order to keep id label structure
      if (!selected) return;
      const value =
        optionsAreObjects && typeof selected === 'string'
          ? (JSON.parse(selected) as { label: string | number; value: TValue }).label
          : selected;

      return <Box>{value.toString()}</Box>;
    });

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
        renderValue={renderValue}
      >
        <MenuItem disabled value={undefined}>
          <em>{!options?.length ? noOptionsAvailableText || 'No options available' : placeholder || label}</em>
        </MenuItem>

        {options.map((option) => {
          const { value, label } = typeof option === 'object' ? option : { value: option, label: option };
          const itemValue = typeof option === 'object' ? JSON.stringify({ value, label }) : value;

          return (
            <MenuItem key={label} value={itemValue}>
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
