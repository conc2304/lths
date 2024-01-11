import { useState, useEffect } from 'react';

import { PageProps, UseGetPageListQuery } from '@lths/features/mms/data-access';

export const usePageList = () => {
  const getPageList = UseGetPageListQuery();
  const [pageList, setPageList] = useState<PageProps[]>([]);

  const fetchPageList = async () => {
    try {
      const pageListResponse = await getPageList();
      setPageList(pageListResponse);
    } catch (error) {
      console.error('Error in fetching page list:', error);
    }
  };

  useEffect(() => {
    fetchPageList();
  }, []);

  return { pageList };
};
