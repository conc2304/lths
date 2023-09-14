import { useState, useEffect } from 'react';

import { EnumValue, useLazyGetEnumListQuery } from '@lths/features/mms/data-access';

export const usePageList = () => {
  const [getEnumList] = useLazyGetEnumListQuery();

  const [pageList, setPageList] = useState<EnumValue[]>([]);

  const fetchPageList = async () => {
    try {
      const response = await getEnumList('PageName').unwrap();
      if (response?.success) setPageList(response?.data?.enum_values);
    } catch (error) {
      console.error(`Error in fetching page list`);
    }
  };

  useEffect(() => {
    fetchPageList();
  }, []);

  return { pageList };
};
