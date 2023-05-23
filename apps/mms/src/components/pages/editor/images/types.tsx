import { ImagesProps } from '@lths/features/mms/data-access';

export type ImageModalProps = {
  open: boolean;
  images: ImagesProps[];
  onClose: () => void;
};

export type ConnectedImageProps = { open: boolean; onClose: () => void };
export type ConnectedImageWrapperProps = { open: boolean; onClose: () => void };

export type ImageGalleryProps = {
  images: ImagesProps[];
};
