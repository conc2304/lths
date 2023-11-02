import { LTHSView, ViewMode } from '@lths/shared/ui-calendar-scheduler';

export type RouteParams = {
  viewMode?: ViewMode;
  view?: LTHSView;
  year?: string;
  month?: string;
  day?: string;
};
