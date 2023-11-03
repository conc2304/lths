import { PageConstraints } from './types';

export const formatConstraintsToReadable = (constraints: PageConstraints) => {
  let text = '';
  const { events, locations, user_segments } = constraints;
  if (events.length > 0) {
    const eventItem = events[0];
    if ('start_date_time' in eventItem) text += 'custom date range, ';
    else if ('event_id' in eventItem && 'state_id' in eventItem) text += 'specific events and states, ';
    else if ('state_id' in eventItem) text += 'specific states for all events, ';
  }
  if (locations.length > 0) text += locations.map((l) => l.name).join(', ') + ', ';
  if (user_segments.length > 0) text += user_segments.map((us) => us.name).join(', ');
  text = text.replace(/, ?$/, '').toLowerCase();
  return text;
};
