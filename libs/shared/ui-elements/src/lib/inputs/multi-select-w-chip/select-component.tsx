import { useRef, useState } from 'react';
import {
  MenuItem,
  MenuItemProps,
  OutlinedInput,
  OutlinedInputProps,
  Select,
  SelectChangeEvent,
  SelectProps,
  SxProps,
  useTheme,
} from '@mui/material';
import { isEqual } from 'lodash';

import { pxToRem } from '@lths/shared/utils';

import { SelectChipRenderer } from './select-chip-renderer';
import { SelectOptionInternal, SelectOptionProp } from './types';
import { normalizeOption } from './utils';
import { ColorThemeMui } from '../../types';

type MultiSelectWithChipProps = {
  options: SelectOptionProp[];
  value?: SelectOptionProp[];
  showAllText?: string;
  showAllValue?: [id: string, label: string];
  placeholder?: string;

  onChange?: (selectedOptions: SelectOptionProp[]) => void;
  onSelect?: (selectedOptions: SelectOptionProp[]) => void;
  onRemove?: (selectedOptions: SelectOptionProp[]) => void;

  size?: 'small' | 'medium';
  sx?: SxProps;
  maxChips?: number;
  color?: ColorThemeMui;
  slotProps?: {
    select?: SelectProps;
    input?: OutlinedInputProps;
    menuItem?: MenuItemProps;
  };
};

const MenuItemFontStyle = {
  fontSize: pxToRem(12),
  lineHeight: pxToRem(22),
  letterSpacing: '0.15px',
  pl: pxToRem(8),
};

const getStyles = (id: string | number, optionsSelected: SelectOptionInternal[]) => {
  const isSelected = optionsSelected.findIndex(([fid]) => fid === id) >= 0;
  return {
    ...MenuItemFontStyle,
    fontWeight: isSelected ? 600 : 400,
  };
};

export const MultiSelectWithChip = (props: MultiSelectWithChipProps) => {
  const {
    options: optionsProp = [],
    value,
    onChange,
    onSelect,
    onRemove,
    placeholder: placeholderProp,
    showAllText = 'Show All',
    showAllValue: showAllValueProp,
    size = 'small',
    sx = {},
    maxChips = 3,
    color = 'primary',
    slotProps = { select: {} as SelectProps<SelectOptionInternal>, input: {}, menuItem: {} },
  } = props;

  const theme = useTheme();

  const showAllValue: SelectOptionInternal = showAllValueProp ?? ['all', showAllText];

  const containerRef = useRef<HTMLDivElement>(null);

  const options = optionsProp.map(normalizeOption);
  const initialValue = value ? value.map(normalizeOption) : [showAllValue];
  const [optionsSelected, setOptionsSelected] = useState<SelectOptionInternal[]>(initialValue);
  const placeholder = placeholderProp ?? showAllText;

  const handleSelectFilter = (event: SelectChangeEvent<SelectOptionInternal[]>) => {
    // values from the selection can only be strings or array of strings, so unfortunately no objects
    const { target } = event;
    const value = target.value;
    if (typeof value === 'string') return;

    // The most recent value is the value at the end of the array
    // Theoretically the `Show All` value should always be at the start or the end only

    // If a user clicks on the same item again then we want to remove it.
    // Get the last item of the values, then check if there is another occurence, then remove both

    function countOccurrences<T>(array: T[], value: T): number {
      return array.reduce((count, current) => count + (isEqual(current, value) ? 1 : 0), 0);
    }

    const lastEntry = value[value.length - 1];
    const lastEntryOccurrences = countOccurrences(value, lastEntry);
    const showAllIndex = value.findIndex(([id]) => id === showAllValue[0]);

    let nextState: SelectOptionInternal[];
    if (showAllIndex === 0) {
      // adding a filter item when the last selection was 'Show All'
      nextState = value.filter(([fid]) => fid !== showAllValue[0]);
    } else if (showAllIndex === value.length - 1) {
      // Selecting the 'Show All' value
      nextState = [showAllValue];
    } else if (lastEntryOccurrences > 1) {
      // Removing a filter item when it is clicked again
      nextState = value.filter(([fid]) => lastEntry[0] !== fid);
      if (nextState.length === 0) nextState.push(showAllValue);
    } else {
      // Selecting a regular filter
      nextState = value;
    }

    setOptionsSelected(nextState);
    onChange && onChange(nextState);
    onSelect && onSelect(nextState);
  };

  const handleRemoveFilter = (id: string | number) => {
    const nextState = optionsSelected.filter(([fid]) => fid !== id);
    if (nextState.length === 0) nextState.push(showAllValue);
    setOptionsSelected(nextState);
    onChange && onChange(nextState);
    onRemove && onRemove(nextState);
  };

  return (
    <Select
      // todo refactor this
      data-testid="MultiSelectChip--root"
      multiple
      value={optionsSelected}
      onChange={handleSelectFilter}
      input={<OutlinedInput {...slotProps.input} />}
      ref={containerRef}
      size={size}
      color={color}
      sx={{
        width: '100%',
        backgroundColor: '#FFF',
        color: '#000',
        height: pxToRem(40),
        boxShadow: '0px 2px 2px 0px #00000026 inset',
        '& .MuiSelect-select': { py: theme.spacing(0.9), pl: theme.spacing(0.5) },
        ...sx,
      }}
      placeholder={placeholder}
      renderValue={(selected: SelectOptionInternal[]) => {
        // !! renderValue runs before useLayoutEffect in SelectChipRenderer will run when add/removing, and then again on menu blur,
        // !! which causes some weirdness and delays in calculating number of chips to render
        // So in lieu of that we are hardcoding the chip limit
        return (
          <SelectChipRenderer
            selectedItems={selected}
            onRemoveItem={handleRemoveFilter}
            chipLimit={maxChips}
            showAllText={showAllText}
          />
        );
      }}
    >
      <MenuItem
        key={showAllValue[0]}
        value={showAllValue[1]}
        sx={getStyles(showAllValue[1], options)}
        color={color}
        {...slotProps.menuItem}
      >
        {showAllText}
      </MenuItem>
      {options.map(([id, label]) => {
        return (
          // value can only be a string
          <MenuItem
            key={id.toString()}
            value={[id.toString(), label.toString()]}
            style={getStyles(label.toString(), options)}
            color={color}
            {...slotProps.menuItem}
          >
            {label.toString()}
          </MenuItem>
        );
      })}
    </Select>
  );
};
