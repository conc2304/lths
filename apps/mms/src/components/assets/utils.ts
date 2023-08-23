export function cleanUrl(url: string): string {
  return url.replace(
    /(\.(mp4|jpg|jpeg|png|gif|avi|mkv|webm|mov|mp3|wav|ogg|flac|webp|bmp|tif|tiff|svg|pdf|doc|docx|xls|xlsx|ppt|pptx|txt|rtf|zip|rar|7z|tar|gz)[^\s]*)/i,
    '.$2'
  );
}

export const refactorData = (response: any) => {
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
