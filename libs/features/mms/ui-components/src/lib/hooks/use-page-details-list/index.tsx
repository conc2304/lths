import { useState } from 'react';

import { PageDetail, useLazyGetPageDetailsQuery, formatConstraintsToReadable } from '@lths/features/mms/data-access';
import { toast } from '@lths/shared/ui-elements';

export const usePageDetailsList = () => {
  const [getPageDetail] = useLazyGetPageDetailsQuery();

  const [pageDetailList, setPageDetailList] = useState<PageDetail[] | undefined>();

  const clearPageDetailList = () => {
    setPageDetailList(undefined);
  };

  const fetchPageDetailList = async (pageList: PageDetail[]) => {
    let fetchFailed = false;
    const fetchPageDetail = async (page_id: string) => {
      try {
        const response = await getPageDetail(page_id).unwrap();
        if ((response && response.success) || response.data) {
          const pageDetail = {
            ...response.data,
            constraints_formatted: formatConstraintsToReadable(response.data.constraints),
          };
          return pageDetail;
        }
      } catch (error) {
        console.error('Error in fetching the page detail: ', error);
        fetchFailed = true;
      }
    };

    const nextPageDetailsList = await Promise.all(pageList.map((page: PageDetail) => fetchPageDetail(page.page_id)));

    if (fetchFailed) toast.add('Failed fetching all Page details', { type: 'error' });

    const filteredPageDetailsList = nextPageDetailsList.filter(Boolean) as PageDetail[];
    setPageDetailList(filteredPageDetailsList);
  };

  return { pageDetailList, fetchPageDetailList, clearPageDetailList };
};
