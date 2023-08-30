import { MouseEvent } from 'react';
import { ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ViewDayOutlinedIcon from '@mui/icons-material/ViewDayOutlined';

import { pxToRem } from '@lths/shared/utils';

type ViewMode = 'calendar' | 'list';

export type ViewModeToggleProps = {
  viewMode: ViewMode;
  onChange: (viewType: ViewMode) => void;
};

export const ViewModeToggle = (props: ViewModeToggleProps) => {
  const { viewMode, onChange } = props;

  const handleOnViewTypeChange = (event: MouseEvent<HTMLElement>, value: ViewMode) => {
    onChange(value);
  };

  const theme = useTheme();

  const getIconColor = (item: ViewMode): string => {
    const isSelected = viewMode === item;
    return isSelected ? '#000' : theme.palette.grey[300];
  };

  return (
    <ToggleButtonGroup
      value={viewMode}
      color="secondary"
      exclusive
      aria-label="Calendar View Type Toggle"
      className="Lths-Button-Group"
      size="small"
    >
      <ToggleButton
        size="small"
        value="list"
        onClick={handleOnViewTypeChange}
        role="button"
        aria-label={'List View'}
        aria-pressed={viewMode === 'list'}
        sx={{ py: pxToRem(4) }}
        data-testid="Calendar-View-Control--view-type-list"
      >
        <ViewDayOutlinedIcon fontSize="small" htmlColor={getIconColor('list')} />
      </ToggleButton>
      <ToggleButton
        value="calendar"
        onClick={handleOnViewTypeChange}
        role="button"
        aria-label={'Calendar View'}
        aria-pressed={viewMode === 'calendar'}
        sx={{ py: pxToRem(4) }}
        data-testid="Calendar-View-Control--view-type-calendar"
      >
        <CalendarMonthOutlinedIcon fontSize="small" htmlColor={getIconColor('calendar')} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
