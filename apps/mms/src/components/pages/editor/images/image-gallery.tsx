import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import { File } from '@lths/features/mms/data-access';

import { ImageGalleryProps } from './types';

const ImageGallery = ({ images = [] }: ImageGalleryProps) => {
  return (
    <ImageList cols={3} sx={{ pl: 2, pr: 2 }}>
      {images &&
        images.map((item) => (
          <ImageListItem key={item.id} sx={{ pb: 2, pl: 2, pr: 2 }}>
            <img
              src={item.files.find((file: File) => file.format_label === 'image-medium').url}
              alt={item.original_file_name}
              loading="lazy"
            />
            <ImageListItemBar title={item.original_file_name} position="below" />
          </ImageListItem>
        ))}
    </ImageList>
  );
};
export default ImageGallery;
