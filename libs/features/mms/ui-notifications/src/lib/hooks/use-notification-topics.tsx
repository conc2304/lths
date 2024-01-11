import { useState, useEffect } from 'react';

import { EnumGroup, EnumValue, useLazyGetEnumListQuery } from '@lths/features/mms/data-access';

export const useNotificationTopics = () => {
  const [getEnumList] = useLazyGetEnumListQuery();

  const [notificationTopics, setNotificationTopics] = useState<EnumValue[]>([]);

  const fetchNotificationTopics = async () => {
    try {
      const response = await getEnumList(EnumGroup.PUSH_NOTIFICATION_TOPICS).unwrap();
      if (response?.success) setNotificationTopics(response?.data?.enum_values);
    } catch (error) {
      console.error(`Error in fetching notification topics`);
    }
  };

  useEffect(() => {
    fetchNotificationTopics();
  }, []);

  return { notificationTopics };
};
