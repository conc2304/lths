import { AssetProps, AssetListResponse } from './types';

export const transformAssetResponse = (response: AssetListResponse): AssetListResponse => {
  const refactoredDataArray = response.data.map((item: AssetProps) => {
    const created_at_formatted = item?.created_on
      ? new Date(item.created_on).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : 'Invalid Date';

    return {
      ...item,
      created_at_formatted: created_at_formatted,
    };
  });

  const refactoredResponse: AssetListResponse = {
    ...response,
    data: refactoredDataArray,
  };

  return refactoredResponse;
};
