import { Property } from 'csstype';
import { Event, EventProps, ToolbarProps, View } from 'react-big-calendar';

export type ViewMode = 'calendar' | 'list';

export type LTHSView = View | 'year';

export type EventComponentProps<TEvent extends object = Event> = { view: LTHSView } & EventProps<TEvent>;

export type HeaderToEventValueMapFn<TEvent extends object = Event> = (
  event: TEvent,
  column: string
) => Date | string | number | undefined;

export type ToolbarHeaderProps = ToolbarProps & {
  viewMode: ViewMode;
  onViewMode?: (viewMode: ViewMode) => void;
};

export type CalendarCustomProperties = {
  '--current-time-color'?: Property.Color;
  '--current-day-highlight-color'?: Property.Color;
  '--current-day-marker-color'?: Property.Color;
  '--show-more-color'?: Property.Color;
  '--accent-border-color'?: Property.Color;
  '--accent-border-width'?: Property.Width;
  '--time-slot-height'?: Property.Height;
  '--time-gutter-width'?: Property.Width;
  '--scrollbar-color'?: Property.Color;
  '--cell-border-color'?: Property.Color;
  '--scrollbar-width'?: Property.Width;
  '--event-min-height'?: Property.Height;
};
