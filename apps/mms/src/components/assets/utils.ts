export function cleanUrl(url: string): string {
  return url.replace(
    /(\.(mp4|jpg|jpeg|png|gif|avi|mkv|webm|mov|mp3|wav|ogg|flac|webp|bmp|tif|tiff|svg|pdf|doc|docx|xls|xlsx|ppt|pptx|txt|rtf|zip|rar|7z|tar|gz)[^\s]*)/i,
    '.$2'
  );
}
