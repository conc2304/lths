import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';

import { ColorThemeMui } from '../../types';

type TValue = string | number | { label: string; value: string | number };
type SelectLTHSProps = SelectProps & {
  helperText?: string | false;
  color?: ColorThemeMui;
  options: Array<TValue | { label: string; value: string | number }>;
  noOptionsAvailableText?: string;
  size?: 'small' | 'medium';
  value: TValue | undefined;
  onChange?: (value: TValue | undefined) => void;
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

  const labelId = `Select-label--${name || Math.random()}`;
  const valuesAreObjects = typeof options?.[0] === 'object' || typeof value === 'object';
  const formattedValue = !!value && valuesAreObjects ? JSON.stringify(value) : value ?? '';

  const renderValue =
    renderValueProp ||
    ((selected) => {
      //  parsing and stringifying in order to keep id label structure
      if (!selected) return;

      const value =
        valuesAreObjects && typeof selected === 'string'
          ? (JSON.parse(selected) as { label: string | number; value: TValue }).label
          : selected;

      return <Box>{value.toString()}</Box>;
    });

  const handleOnChange = ({ target: { value } }: SelectChangeEvent<string | number | null>) => {
    console.log('handleOnChange', value);
    let formValue = undefined;
    if (valuesAreObjects) {
      const parsedValue = JSON.parse(value as string);
      formValue = { label: parsedValue.label, value: parsedValue.value };
    } else {
      formValue = value ? value : undefined;
    }
    onChange && onChange(formValue);
  };

  return (
    <FormControl fullWidth sx={{ my: 2 }} size={size}>
      {label && (
        <InputLabel id={labelId} color={error ? 'error' : color}>
          {label}
        </InputLabel>
      )}
      <Select
        data-testid={labelId}
        name={name}
        value={formattedValue}
        required={required}
        label={label}
        labelId={labelId}
        onChange={handleOnChange}
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
        <FormHelperText error={error} sx={{ ml: 2 }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};
