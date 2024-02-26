import { MouseEvent } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
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

  const handleOnViewTypeChange = (_: MouseEvent<HTMLElement>, value: ViewMode) => {
    onChange(value);
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
        // color="secondary"
        aria-pressed={viewMode === 'list'}
        sx={{ py: pxToRem(4) }}
        data-testid="Calendar-View-Control--view-type-list"
      >
        <ViewDayOutlinedIcon fontSize="small" />
      </ToggleButton>
      <ToggleButton
        value="calendar"
        onClick={handleOnViewTypeChange}
        role="button"
        // color="secondary"
        aria-label={'Calendar View'}
        aria-pressed={viewMode === 'calendar'}
        sx={{ py: pxToRem(4) }}
        data-testid="Calendar-View-Control--view-type-calendar"
      >
        <CalendarMonthOutlinedIcon fontSize="small" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
