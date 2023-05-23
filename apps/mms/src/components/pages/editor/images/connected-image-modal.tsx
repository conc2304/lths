import { useEffect } from 'react';

import { useLazyGetImagesListQuery } from '@lths/features/mms/data-access';

import ImageModal from './image-modal';
import { ConnectedImageProps, ConnectedImageWrapperProps } from './types';

const ConnectedImageModal = ({ open, onClose }: ConnectedImageProps) => {
  const [getImages, { data }] = useLazyGetImagesListQuery();

  const fetchData = async () => {
    await getImages();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <ImageModal open={open} onClose={onClose} images={data?.data} />;
};

const ConnectedImageModalWrapper = ({ open, onClose }: ConnectedImageWrapperProps) => {
  return <ConnectedImageModal open={open} onClose={onClose} />;
};

export default ConnectedImageModalWrapper;
