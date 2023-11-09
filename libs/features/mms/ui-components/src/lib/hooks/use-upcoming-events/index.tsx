import { useState, useEffect } from 'react';

import { EventItem, useLazyGetUpcomingEventsQuery } from '@lths/features/mms/data-access';

export const useUpcomingEvents = () => {
  const [getUpcomingEvents] = useLazyGetUpcomingEventsQuery();

  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);

  const fetchUpcomingEvents = async () => {
    try {
      const response = await getUpcomingEvents().unwrap();
      if (response?.success) setUpcomingEvents(response?.data);
    } catch (error) {
      console.error(`Error in fetching upcoming events`);
    }
  };

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  return { upcomingEvents };
};
