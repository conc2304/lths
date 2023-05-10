import { useEffect } from 'react';
import * as React from 'react';
import { Box, Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';
import { v4 as uuidv4 } from 'uuid';

import { useLazyGetComponentDetailQuery, useLazyGetComponentListQuery } from '@lths/features/mms/data-access';
import { ComponentProps, useEditorActions } from '@lths/features/mms/ui-editor';

import { ComponentGallery } from './component-gallery';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export type ComponentModalProps = {
  open: boolean;
};
export type ConnectedComponentModalProps = ComponentModalProps & {
  components: ComponentProps[];
  onClose: () => void;
  onSelectComponent: (componentId: string) => void;
};
export const ConnectedComponentModalFull = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
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
    <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative', borderRadius: 0 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Component Library
          </Typography>
          <Button autoFocus color="inherit" onClick={onClose}>
            Close
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ margin: 4 }}>
        <ComponentGallery components={components} onSelectComponent={onSelectComponent} />
      </Box>
    </Dialog>
  );
};
