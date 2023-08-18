import { useEffect, useState } from 'react';

import { useLazyGetComponentListQuery } from '@lths/features/mms/data-access';

import ComponentModal from './component-modal';
import FullModal from './modal-full';
import { ConnectedComponentProps, ConnectedComponentWrapperProps } from './types';

const ConnectedModal = ({ open, onClose, Modal, onSelect }: ConnectedComponentProps) => {
  const [category, setCategory] = useState<string>(null);
  const [getData, { data, isFetching: isComponentListLoading }] = useLazyGetComponentListQuery();

  const fetchData = async (category: string) => {
    await getData({ category });
  };

  useEffect(() => {
    fetchData(category);
  }, [category]);

  const handleSelectedCategory = (category: string) => {
    setCategory(category);
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      components={data?.data}
      onSelect={onSelect}
      onSelectCategory={handleSelectedCategory}
      isComponentListLoading={isComponentListLoading}
    />
  );
};

const ConnectedModalWrapper = ({ open, onClose, variant, onSelect }: ConnectedComponentWrapperProps) => {
  const modal = variant === 'full' ? FullModal : ComponentModal;
  return <ConnectedModal open={open} onClose={onClose} Modal={modal} onSelect={onSelect} />;
};

export default ConnectedModalWrapper;
