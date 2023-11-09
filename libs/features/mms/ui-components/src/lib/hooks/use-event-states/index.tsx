import { useState, useEffect } from 'react';

import { EnumValue, useLazyGetEnumListQuery } from '@lths/features/mms/data-access';

export const useEventStates = () => {
  const [getEnumList] = useLazyGetEnumListQuery();

  const [eventStates, setEventStates] = useState<EnumValue[]>([]);

  const fetchEventStates = async () => {
    try {
      const response = await getEnumList('EventState').unwrap();
      if (response?.success) setEventStates(response?.data?.enum_values);
    } catch (error) {
      console.error(`Error in fetching event state list`);
    }
  };

  useEffect(() => {
    fetchEventStates();
  }, []);

  return { eventStates };
};
