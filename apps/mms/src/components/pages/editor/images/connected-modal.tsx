import { useEffect } from 'react';

import { useLazyGetImagesListQuery } from '@lths/features/mms/data-access';

import ImageModal from './modal';
import { ConnectedImageModalProps } from './types';

const ConnectedImageModal = ({ open, onClose, onSelect }: ConnectedImageModalProps) => {
  const [getImages, { data }] = useLazyGetImagesListQuery();

  const fetchData = async () => {
    await getImages();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <ImageModal open={open} onClose={onClose} onSelect={onSelect} images={data?.data} />;
};

export default ConnectedImageModal;
