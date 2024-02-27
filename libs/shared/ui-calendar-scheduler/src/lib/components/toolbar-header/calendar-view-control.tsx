import { Box, Button, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { styled } from '@mui/system';
import { format } from 'date-fns';
import { Navigate, ToolbarProps, View } from 'react-big-calendar';

import { pxToRem } from '@lths/shared/utils';

import { ViewModeToggle } from './view-mode-toggle';
import { ViewNamesGroup } from './view-names-toggle';
import { LTHSView } from '../../types';
import { ViewMode } from '../../types';

export type CalendarViewControlProps = ToolbarProps & {
  viewMode?: ViewMode;
  onViewMode?: (viewMode: ViewMode) => void;
};

const StyledIconButton = styled(IconButton)(() => ({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: '20%',
  padding: '0',
  height: '1.3rem',
  width: '1.3rem',
  margin: '0 2px',
}));

export const CalendarViewControl = (props: CalendarViewControlProps) => {
  const {
    date,
    localizer: { messages },
    onNavigate,
    onView,
    onViewMode,
    viewMode,
    view,
    views = ['day', 'week', 'month'],
  } = props;

  const handleOnViewChange = (viewName: View) => {
    onView(viewName);
  };

  const handleOnViewModeChange = (viewMode: ViewMode) => {
    !!onViewMode && onViewMode(viewMode);
  };

  const viewToDateFormatMap: Partial<Record<LTHSView, string>> = {
    day: 'EEEE, MMMM do, yyyy', // ie Tuesday, May 9th, 2023
    week: 'MMMM yyyy', // May 2023
    month: 'MMMM yyyy',
    year: 'yyyy',
  };

  const dateFormat: string = viewToDateFormatMap[view] || 'MMMM yyyy';
  return (
    <Box
      className="Calendar-View-Control--root"
      display="flex"
      justifyContent={'space-between'}
      alignItems={'center'}
      sx={{
        p: pxToRem(18),
      }}
    >
      <Box className="Calendar-View-Control--date-navigator" display="flex" alignItems={'center'}>
        <Box>
          <StyledIconButton
            size="small"
            onClick={() => onNavigate(Navigate.PREVIOUS)}
            aria-label={messages.previous}
            data-testid="Calendar-View-Control--navigation--prev"
            color="secondary"
          >
            <ChevronLeft fontSize="inherit" />
          </StyledIconButton>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={() => onNavigate(Navigate.TODAY)}
            aria-label={messages.today}
            sx={{
              padding: '0',
              lineHeight: '0.8rem',
              fontSize: '0.8rem',
              '&.MuiButton-sizeSmall': {
                height: '1.3rem',
              },
            }}
            data-testid="Calendar-View-Control--navigation--today"
          >
            {messages.today}
          </Button>

          <StyledIconButton
            size="small"
            color="secondary"
            onClick={() => onNavigate(Navigate.NEXT)}
            aria-label={messages.next}
            data-testid="Calendar-View-Control--navigation--next"
          >
            <ChevronRight fontSize="inherit" />
          </StyledIconButton>
        </Box>

        <Typography
          variant="h2"
          sx={{
            ml: 2.5,
            fontWeight: 400,
            fontSize: pxToRem(30),
            lineHeight: pxToRem(24),
            letterSpacing: '0.15px',
          }}
        >
          {format(date, dateFormat)}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex' }}>
        <ViewNamesGroup view={view} views={views as View[]} messages={messages} onView={handleOnViewChange} />
        <Box sx={{ marginX: 1.5 }} />
        {viewMode && !!onViewMode && <ViewModeToggle viewMode={viewMode} onChange={handleOnViewModeChange} />}
      </Box>
    </Box>
  );
};
