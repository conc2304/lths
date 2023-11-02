import { useMemo, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { isTuesday, format, getDay, parse, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import {
  Calendar,
  dateFnsLocalizer,
  Components,
  ToolbarProps,
  ViewsProps,
  View,
  DateCellWrapperProps,
  EventProps,
  Event,
  NavigateAction,
  Views,
} from 'react-big-calendar';

import { pxToRem } from '@lths/shared/utils';

import { CALENDAR_MESSAGES, DEFAULT_LIST_VIEW_COL_HEADER } from '../../constants';
import { ListViewContextProvider } from '../../context';
import {
  ViewMode,
  LTHSView,
  EventComponentProps,
  RowBuilderFn,
  HeaderToEventValueMapFn,
  ListViewColumnHeader,
  ToolbarHeaderProps,
  CalendarCustomProperties,
} from '../../types';
import { DateCellWrapper, TimeGutterHeader, TimeGutterWrapper, TimeSlotWrapper } from '../calendar-components';
import { ToolbarHeader } from '../toolbar-header';
import { DayList, WeekList, MonthList, MonthDateHeader, MonthHeader, WeekHeader, YearList, YearView } from '../views';
import { BaseColumnValue } from '../views/list-view/column-to-event-prop';
import { BaseRowBuilder } from '../views/list-view/row-builder';

import './calendar.scss';

export type LTHSCalendarProps<TEvent extends object = Event> = {
  date?: Date;
  events: TEvent[];
  view?: LTHSView;
  views?: LTHSView[];
  viewMode?: ViewMode;
  onSetViewMode?: (viewMode: ViewMode) => void;
  onSetView?: (view: View) => void;
  backgroundEvents?: TEvent[];
  customComponents?: {
    footer?: JSX.Element;
    toolbar?: (args: ToolbarHeaderProps) => JSX.Element;
    eventItem?: (args: EventComponentProps) => JSX.Element;
  };
  onRangeChange?: (range: Date[] | { start: Date; end: Date }, view?: LTHSView) => void | undefined;
  onNavigate?: ((newDate: Date, view: LTHSView, action: NavigateAction) => void) | undefined;
  cssVariableOverrides?: CalendarCustomProperties;

  //  For ListViewContextProvider
  headerCells: ListViewColumnHeader[];
  rowBuilder: RowBuilderFn;
  headerToEventValueMap: HeaderToEventValueMapFn;
};

export const LTHSCalendar = <TEvent extends object = Event>(props: LTHSCalendarProps<TEvent>) => {
  const {
    date: dateProp,
    events,
    view: viewProp = 'month',
    views: availableViews = [Views.DAY, Views.WEEK, Views.MONTH, 'year'],
    viewMode: viewModeProp = 'calendar',
    onSetViewMode,
    onSetView,
    onNavigate,
    onRangeChange,
    backgroundEvents = [],
    // toolbar and eventItem are aliased to avoid component casing warnings and to keep props all lowercased
    customComponents,
    cssVariableOverrides = {},
    headerCells = DEFAULT_LIST_VIEW_COL_HEADER,
    rowBuilder = BaseRowBuilder,
    headerToEventValueMap = BaseColumnValue,
  } = props;

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: { 'en-US': enUS },
  });

  let ToolbarComponent: ((args: ToolbarHeaderProps) => JSX.Element) | null;
  let EventComponent: ((args: EventComponentProps) => JSX.Element) | null;
  let footer: JSX.Element | undefined;

  if (customComponents !== undefined) {
    footer = customComponents?.footer;
    ToolbarComponent =
      customComponents?.toolbar !== undefined
        ? (customComponents.toolbar as (args: ToolbarHeaderProps) => JSX.Element)
        : null;
    EventComponent =
      customComponents?.eventItem !== undefined
        ? (customComponents.eventItem as (args: EventComponentProps) => JSX.Element)
        : null;
  } else {
    ToolbarComponent = null;
    EventComponent = null;
    footer = undefined;
  }

  console.log({ viewProp });
  const [date, setDate] = useState(dateProp || new Date());
  const [view, setView] = useState<LTHSView>(viewProp || 'month');
  const viewRef = useRef(view);
  const [viewMode, setViewMode] = useState<ViewMode>(viewModeProp || 'calendar');

  const theme = useTheme();
  const timeSlotHeightPX = 64;
  const timeGutterWidthPX = 60;
  const accentBorderColor = theme.palette.grey[600];
  const accentBorderWidth = '1px';
  const cellBorderColor = theme.palette.grey[300];
  const scrollbarColor = theme.palette.grey[700];

  const cssVariables: CalendarCustomProperties = {
    '--current-time-color': '#0091FF',
    '--current-day-highlight-color': '#cddce787',
    '--show-more-color': theme.palette.primary.main,
    '--accent-border-color': accentBorderColor,
    '--accent-border-width': accentBorderWidth,
    '--time-slot-height': pxToRem(timeSlotHeightPX),
    '--time-gutter-width': pxToRem(timeGutterWidthPX),
    '--scrollbar-color': scrollbarColor,
    '--cell-border-color': cellBorderColor,
    '--scrollbar-width': '5px',
    '--event-min-height': '3.5rem',
    ...cssVariableOverrides,
  };

  const handleOnView = (newView: View) => {
    console.log('handleOnView | ', newView);

    setView(newView);
    viewRef.current = newView;
    onSetView && onSetView(newView);
  };

  const handleOnNavigate = (date: Date, newView: View, action: NavigateAction) => {
    console.log('handleOnNavigate C |', { date, newView, action });

    setDate(date);
    // !! Hack Warning
    // !! we are using viewRef here bc when we click on a date onView gets called
    // !! and this has the previous view instead of the next vies
    // !! and we have handleOnView set the ref that his reads
    onNavigate && onNavigate(date, viewRef.current, action);
  };

  const handleOnViewMode = (viewMode: ViewMode) => {
    console.log('handleOnViewMode | ', viewMode);

    setViewMode(viewMode);
    onSetViewMode && onSetViewMode(viewMode);
  };

  const { components, views, defaultDate } = useMemo<{
    components: Components<TEvent>;
    views: ViewsProps<TEvent, object>;
    defaultDate: Date;
  }>(() => {
    return {
      components: {
        dateCellWrapper: (props: DateCellWrapperProps) => <DateCellWrapper {...props} view={view} />,
        timeGutterWrapper: (props) => (
          <TimeGutterWrapper
            {...props}
            slotHeight={pxToRem(timeSlotHeightPX)}
            showHalfPoint={false}
            gutterWidth={pxToRem(timeGutterWidthPX + 1)}
          />
        ),
        timeGutterHeader: () => (
          <TimeGutterHeader
            gutterWidth={pxToRem(timeGutterWidthPX)}
            timeSlotHeight={pxToRem(timeSlotHeightPX + 1)}
            view={view}
            border={{ color: accentBorderColor, width: accentBorderWidth }}
          />
        ),
        timeSlotWrapper: (props) => <TimeSlotWrapper slotHeight={pxToRem(timeSlotHeightPX / 2)} {...props} />,
        // Event and Toolbar are passed in via props
        event: EventComponent
          ? (props: EventProps) => EventComponent && EventComponent({ view: view, ...props })
          : undefined,
        toolbar: ToolbarComponent
          ? (props: ToolbarProps) =>
              ToolbarComponent && ToolbarComponent({ ...props, viewMode: viewMode, onViewMode: handleOnViewMode })
          : (props: ToolbarProps) => <ToolbarHeader {...props} viewMode={viewMode} onViewMode={handleOnViewMode} />,
        week: {
          header: WeekHeader,
        },
        month: {
          header: MonthHeader,
          dateHeader: MonthDateHeader,
        },
      },

      // We can only pass in the views as a reference and not as an implemented component as below
      // We pass in our custom list rendering definitions to the list view via context
      // We use these views as HOC's around the <ListView /> component so that
      // we can assign our custom navigation actions for each view
      views: {
        day: availableViews.includes(Views.DAY) ? (viewMode === 'calendar' ? true : DayList) : undefined,
        week: availableViews.includes(Views.DAY) ? (viewMode === 'calendar' ? true : WeekList) : undefined,
        month: availableViews.includes(Views.DAY) ? (viewMode === 'calendar' ? true : MonthList) : undefined,
        year: availableViews.includes(Views.DAY) ? (viewMode === 'calendar' ? YearView : YearList) : undefined,
      },
      defaultDate: new Date(),
    };
  }, [view, viewMode, customComponents]);

  return (
    <Box
      className={`Calendar-Scheduler--root Calendar-Scheduler--view-${view}`}
      data-testid={`Calendar-Scheduler--root Calendar-Scheduler--view-${view}`}
      sx={{
        boxSizing: 'border-box',
        borderRadius: '12px',
        boxShadow: '0px 2px 4px 1px #00000026',
        display: 'flex',
        flexDirection: 'column',
        width: '-webkit-fill-available',
      }}
    >
      <Box
        component={'div'}
        style={{
          height: viewMode === 'calendar' ? '1163px' : '100%',
          width: '100%',
          // adding css variables here to use in calendar.scss and override rbc's styles
          ...cssVariables,
        }}
      >
        <ListViewContextProvider values={{ headerCells, rowBuilder, headerToEventValueMap }}>
          <Calendar
            components={components}
            defaultDate={defaultDate}
            localizer={localizer}
            events={events}
            backgroundEvents={backgroundEvents}
            style={{ height: '100%' }}
            messages={CALENDAR_MESSAGES}
            date={date}
            onView={handleOnView}
            view={view as View}
            views={views}
            onNavigate={handleOnNavigate}
            onRangeChange={onRangeChange}
            // TODO figure out how to make the overlap look not crappy
            dayLayoutAlgorithm="overlap"
            popup
            formats={{
              // for some reason we want tuesday to be 4 leters and everyone else to be 3
              dayFormat: (date: Date) => {
                return `${isTuesday(date) ? 'TUES' : format(date, 'E').toUpperCase()} ${format(date, 'd')}`;
              },
              weekdayFormat: (date: Date) => {
                return isTuesday(date) ? 'TUES' : format(date, 'E').toUpperCase();
              },
            }}
          />
        </ListViewContextProvider>
      </Box>
      {viewMode === 'calendar' && footer && (
        <Box
          data-testid="CalendarScheduler--footer"
          display={'flex'}
          justifyContent={'start'}
          alignContent={'center'}
          paddingY={theme.spacing(2.5)}
          paddingX={theme.spacing(4)}
          width="100%"
          borderTop={'1px solid #000'}
          minHeight={theme.spacing(6)}
        >
          {footer}
        </Box>
      )}
    </Box>
  );
};
