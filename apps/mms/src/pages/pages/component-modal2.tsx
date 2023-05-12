import { useEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, Dialog, DialogContent, Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { useLazyGetComponentDetailQuery, useLazyGetComponentListQuery } from '@lths/features/mms/data-access';
import { ComponentProps, useEditorActions } from '@lths/features/mms/ui-editor';

import { ComponentGallery } from '../../components/pages/editor/component-gallery';
export type ComponentModalProps = {
  open: boolean;
};
export type ConnectedComponentModalProps = ComponentModalProps & {
  components: ComponentProps[];
  onClose: () => void;
  onSelectComponent: (componentId: string) => void;
};
export const ConnectedComponentModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [getData, { isFetching, isLoading, data }] = useLazyGetComponentListQuery();
  const [getDetail, { data: detail, isSuccess: isDetailSuccess }] = useLazyGetComponentDetailQuery();

  const { components, initEditor, addComponent } = useEditorActions();

  const fetchData = async () => {
    await getData();
  };
  useEffect(() => {
    fetchData();
  }, []);
  /* useEffect(() => {
    if (detail && detail.data) {
      addComponent(detail.data);
      console.log('useEffect', detail);
    } else console.log('useEffect-not found', detail);
  }, [detail]);
*/
  console.log('useEffect-2', components);
  const handleSelectComponent = async (componentId: string) => {
    const id = uuidv4();
    const detail = await getDetail(componentId);
    console.log('handleSelectComponent', detail);
    if (isDetailSuccess) {
      addComponent(detail.data.data);
      onClose();
    }
    //addComponent({ __ui_id__: id, component_id: componentId, component_name: 'Card', component_type: 'Component' });
    //console.log('handleTabChange', components);
  };
  return (
    <ComponentModal open={open} onClose={onClose} components={data?.data} onSelectComponent={handleSelectComponent} />
  );
};
export const ComponentModal = ({ open, onClose, components = [], onSelectComponent }: ConnectedComponentModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogContent>
        <ComponentGallery components={components} onSelectComponent={onSelectComponent} />
      </DialogContent>
    </Dialog>
  );
};
