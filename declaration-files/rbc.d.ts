import { DateLocalizer } from 'react-big-calendar';

declare module 'react-big-calendar' {
  interface Messages {
    year?: string | undefined;
  }

  interface ViewStatic {
    range?: (date: Date, options: { localizer: DateLocalizer }) => [Date] | { start: Date; end: Date };
  }
}
