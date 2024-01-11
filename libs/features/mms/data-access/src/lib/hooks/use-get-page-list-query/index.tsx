import { useLazyGetDefaultPagesQuery, useLazyGetEnumListQuery } from '../../pages/api';
import { PageType } from '../../pages/types';

export type PageProps = {
  label: string;
  value: string;
  type: PageType;
};

export const UseGetPageListQuery = () => {
  const [getDefaultPages] = useLazyGetDefaultPagesQuery();
  const [getEnumList] = useLazyGetEnumListQuery();

  const getPageList = async () => {
    try {
      const nativePageListResponse = await getEnumList('NativePageList').unwrap();
      const defaultPageListResponse = await getDefaultPages().unwrap();
      let combinedPageList: PageProps[] = [];
      if (nativePageListResponse?.success && defaultPageListResponse?.success) {
        const nativePageList =
          nativePageListResponse?.data?.enum_values?.map((p) => ({
            label: p.name,
            value: p.value,
            type: PageType.PreDefined,
          })) || [];
        const defaultPageList =
          defaultPageListResponse?.data?.map((p) => ({
            label: p.name,
            value: p.page_id,
            type: p.type,
          })) || [];
        combinedPageList = [...defaultPageList, ...nativePageList];
        combinedPageList.sort((a, b) => a.label.localeCompare(b.label));
      }
      return combinedPageList;
    } catch (error) {
      console.error('Error in fetching the page list', error);
      throw error;
    }
  };

  return getPageList;
};
