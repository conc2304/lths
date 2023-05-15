import { Dialog, DialogContent } from '@mui/material';

import ComponentGallery from './gallery';
import { ComponentModalProps } from './types';

export const ComponentModal = ({ open, onClose, components = [], onSelectComponent }: ComponentModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <ComponentGallery components={components} onSelectComponent={onSelectComponent} />
      </DialogContent>
    </Dialog>
  );
};

export default ComponentModal;
