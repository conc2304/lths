import { useEffect } from 'react';

import { useLazyGetComponentDetailQuery, useLazyGetComponentListQuery } from '@lths/features/mms/data-access';
import { useEditorActions } from '@lths/features/mms/ui-editor';

import BasicModal from './modal';
import FullModal from './modal-full';
import { ConnectedComponentProps, ConnectedComponentWrapperProps } from './types';

const ConnectedModal = ({ open, onClose, Modal }: ConnectedComponentProps) => {
  console.log('Render...ConnectedModal');
  const [getData, { data }] = useLazyGetComponentListQuery();
  const [getDetail, { isSuccess: isDetailSuccess }] = useLazyGetComponentDetailQuery();

  const { addComponent } = useEditorActions();

  const fetchData = async () => {
    await getData();
  };

  useEffect(() => {
    console.log('Fetching component data...');
    fetchData();
  }, []);

  const handleSelectComponent = async (componentId: string) => {
    const detail = await getDetail(componentId);
    if (isDetailSuccess && detail?.data?.data) {
      addComponent(detail.data.data);
      onClose();
    } else {
      console.log('Failed to find component');
    }
  };
  console.log('Fetching component data...', data?.data);
  return <Modal open={open} onClose={onClose} components={data?.data} onSelect={handleSelectComponent} />;
};

const ConnectedModalWrapper = ({ open, onClose, variant }: ConnectedComponentWrapperProps) => {
  const modal = variant === 'full' ? FullModal : BasicModal;
  return <ConnectedModal open={open} onClose={onClose} Modal={modal} />;
};

export default ConnectedModalWrapper;
