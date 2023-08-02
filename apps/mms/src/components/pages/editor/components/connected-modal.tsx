import { useEffect, useState } from 'react';

import { useLazyGetComponentDetailQuery, useLazyGetComponentListQuery } from '@lths/features/mms/data-access';
import { useEditorActions } from '@lths/features/mms/ui-editor';

import ComponentModal from './component-modal';
import FullModal from './modal-full';
import { ConnectedComponentProps, ConnectedComponentWrapperProps } from './types';

const ConnectedModal = ({ open, onClose, Modal }: ConnectedComponentProps) => {
  console.log('Render...ConnectedModal');
  const [category, setCategory] = useState<string>(null);
  const [getData, { data }] = useLazyGetComponentListQuery();
  const [getDetail, { isSuccess: isDetailSuccess }] = useLazyGetComponentDetailQuery();

  const { addComponent } = useEditorActions();

  const fetchData = async (category: string) => {
    await getData({ category });
  };

  useEffect(() => {
    console.log('Fetching component data...');
    fetchData(category);
  }, [category]);

  const handleSelectComponent = async (componentId: string) => {
    const detail = await getDetail(componentId);
    if (isDetailSuccess && detail?.data?.data) {
      addComponent(detail.data.data);
      onClose();
    } else {
      console.log('Failed to find component');
    }
  };

  const handleSelectedCategory = (category: string) => {
    setCategory(category);
  };

  console.log('Fetching component data...', data?.data);
  return (
    <Modal
      open={open}
      onClose={onClose}
      components={data?.data}
      onSelect={handleSelectComponent}
      onSelectCategory={handleSelectedCategory}
    />
  );
};

const ConnectedModalWrapper = ({ open, onClose, variant }: ConnectedComponentWrapperProps) => {
  const modal = variant === 'full' ? FullModal : ComponentModal;
  return <ConnectedModal open={open} onClose={onClose} Modal={modal} />;
};

export default ConnectedModalWrapper;
