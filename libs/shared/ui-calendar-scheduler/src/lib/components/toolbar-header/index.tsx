import { isValidElement } from 'react';
import { Box } from '@mui/material';

import { CalendarViewControl } from './calendar-view-control';
import { ToolbarHeaderProps } from '../../types';

export const ToolbarHeader = (props: ToolbarHeaderProps) => {
  const { date, label, localizer, onNavigate, onView, view, views, viewMode, onViewMode, children } = props;

  return (
    <Box data-testid="Calendar-Toolbar--root">
      <CalendarViewControl
        date={date}
        label={label}
        localizer={localizer}
        onNavigate={onNavigate}
        onView={onView}
        onViewMode={onViewMode}
        viewMode={viewMode}
        view={view}
        views={views}
      />
      {isValidElement(children) && children}
    </Box>
  );
};
