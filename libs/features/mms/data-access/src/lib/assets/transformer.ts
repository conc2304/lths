import { AssetProps } from './types';

interface AssetListResponse {
  data: any;
  meta: {
    page: number;
    page_size: number;
    total: number;
  };
  success: boolean;
  message: string;
}

export const transformAssetResponse = (response: any): AssetListResponse => {
  const refactoredDataArray = response.data.map((item: AssetProps) => {
    const created_at_formatted =
      item.created_at === undefined
        ? new Date(item.created_on).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : new Date(item.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });

    return {
      ...item,
      created_at_formatted: created_at_formatted,
    };
  });

  const refactoredResponse: AssetListResponse = {
    data: refactoredDataArray,
    meta: {
      page: response.pagination.offset,
      page_size: response.pagination.limit,
      total: response.pagination.totalItems,
    },
    success: true,
    message: '',
  };

  return refactoredResponse;
};
