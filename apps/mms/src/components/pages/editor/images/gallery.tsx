import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import { File } from '@lths/features/mms/data-access';

import { ImageGalleryProps } from './types';

const ImageGallery = ({ images = [], onSelect }: ImageGalleryProps) => {
  return (
    <ImageList cols={3} sx={{ pl: 2, pr: 2 }}>
      {images &&
        images.map((item) => {
          const url = item.files?.find((file: File) => file.format_label === 'image-medium')?.url;
          return (
            <ImageListItem key={item.id} sx={{ pb: 2, pl: 2, pr: 2 }} onClick={() => onSelect(url)}>
              <img src={url} alt={item.original_file_name} loading="lazy" />
              <ImageListItemBar title={item.original_file_name} position="below" />
            </ImageListItem>
          );
        })}
    </ImageList>
  );
};
export default ImageGallery;
