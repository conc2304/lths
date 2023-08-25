export const transformAssetResponse = (response: any) => {
  const refactoredDataArray = response.data.map((item: any) => {
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

  const refactoredResponse = {
    data: refactoredDataArray,
    meta: {
      page: response.pagination.offset,
      page_size: response.pagination.limit,
      total: response.pagination.totalItems,
    },
  };

  return refactoredResponse;
};
